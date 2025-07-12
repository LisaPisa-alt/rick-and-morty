import {
  addFavorite,
  deleteFavorite,
  fetchCharactersFromAPI,
  fetchCharactersFromCache,
} from "../services/characterService.js";

export const getCharacters = async (req, res) => {
  const { page } = req.query;
  try {
    const { characters, info } = await fetchCharactersFromAPI(page);
    res.json({ characters, info, source: "api" });
  } catch (error) {
    console.error("API fetch failed, falling back to cache:", error.message);
    try {
      const { characters, info } = await fetchCharactersFromCache(page);
      res.json({ characters, info, source: "cache" });
    } catch (error) {
      console.log("Cache fetch failed", error.message);
      res.status(500).json({ message: "Unable to retrieve data" });
    }
  }
};

export const addFavoriteCharacter = async (req, res) => {
  const characterId = parseInt(req.params.characterId, 10);
  const { username } = req.user;
  const sanitizedUsername = username.toLowerCase();
  try {
    const favoriteStatus = await addFavorite(sanitizedUsername, characterId);
    res.json(favoriteStatus);
  } catch (error) {
    console.error("Add favorite error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const deleteFavoriteCharacter = async (req, res) => {
  const characterId = parseInt(req.params.characterId, 10);
  const { username } = req.user;
  const sanitizedUsername = username.toLowerCase();
  try {
    const favoriteStatus = await deleteFavorite(sanitizedUsername, characterId);
    res.json(favoriteStatus);
  } catch (error) {
    console.error("Delete favorite error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
