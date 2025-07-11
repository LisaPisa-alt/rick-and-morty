import { getToken } from "./userSession";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchCharacters = async (page = 1) => {
  const token = getToken();
  const characterResponse = await fetch(`${baseURL}/characters/?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return characterResponse.json();
};

export const fetchFavorites = async () => {
  const token = getToken();
  const favoritesResponse = await fetch(`${baseURL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await favoritesResponse.json();
};

export const login = async ({ username, password }) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const signUp = async ({ username, password }) => {
  const response = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const addToFavorite = async (id) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/favorites/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const removeFromFavorite = async (id) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
