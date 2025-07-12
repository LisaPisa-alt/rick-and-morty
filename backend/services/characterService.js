import prisma from "../prisma/prisma.js";

export const fetchCharactersFromAPI = async (page) => {
  const response = await fetch(
    `${process.env.API_URL}/character/?page=${page}`
  );
  if (!response.ok) throw new Error("Rick and Morty Api not available");

  const body = await response.json();

  await Promise.all(
    body.results.map((char) =>
      prisma.character.upsert({
        where: { id: char.id },
        update: {
          name: char.name,
          image: char.image,
          status: char.status,
          species: char.species,
          gender: char.gender,
          origin: char.origin?.name || "Unknown",
          location: char.location?.name || "Unknown",
        },
        create: {
          id: char.id,
          name: char.name,
          image: char.image,
          status: char.status,
          species: char.species,
          gender: char.gender,
          origin: char.origin?.name || "Unknown",
          location: char.location?.name || "Unknown",
        },
      })
    )
  );

  return { characters: body.results, info: body.info };
};

export const fetchCharactersFromCache = async (page) => {
  const characters = await prisma.character.findMany({
    skip: (page - 1) * 20,
    take: 20,
  });

  const totalCount = await prisma.character.count();
  const totalPages = Math.ceil(totalCount / 20);

  const info = {
    count: totalCount,
    pages: totalPages,
    next: page < totalPages ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
  };

  return { characters, info };
};

export const addFavorite = async (username, characterId) => {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
  });
  if (!user) throw new Error("User not found");

  let character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_characterId: { userId: user.id, characterId: character.id },
    },
  });
  if (!existing) {
    await prisma.favorite.create({
      data: { userId: user.id, characterId: character.id },
    });
    return { favorited: true };
  }
};

export const deleteFavorite = async (username, characterId) => {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
  });
  if (!user) throw new Error("User not found");

  let character = await prisma.character.findUnique({
    where: { id: characterId },
  });
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_characterId: { userId: user.id, characterId: character.id },
    },
  });
  if (existing) {
    await prisma.favorite.delete({
      where: {
        userId_characterId: { userId: user.id, characterId: character.id },
      },
    });
    return { favorited: false };
  }
};
