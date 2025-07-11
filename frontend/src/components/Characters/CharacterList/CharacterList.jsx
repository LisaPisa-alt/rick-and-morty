import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RickandMorty from "../../../images/rick-and-morty.png";
import {
  addToFavorite,
  fetchCharacters,
  fetchFavorites,
  removeFromFavorite,
} from "../../../utils/api";
import { getToken } from "../../../utils/userSession";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Pagination from "../../Pagination/Pagination";
import CharacterTile from "../CharacterTile/CharacterTile";
import "./characterlist.scss";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    setSearchParams({ page: pageNumber });
  }, [pageNumber, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate("/login");
        }
        setLoading(true);
        const dataCharacters = await fetchCharacters(pageNumber);
        const dataFavorites = await fetchFavorites();
        setCharacters(dataCharacters.characters);
        setTotalPages(dataCharacters.info.pages);
        setFavorites(dataFavorites.favorites);
        if (
          dataCharacters.source === "cache" ||
          dataFavorites.source === "cache"
        ) {
          setErrorMessage("Live data unavailable. Showing cached results.");
        }
      } catch (error) {
        console.log("There has been an error", error);
        setErrorMessage(
          "Something went wrong while loading characters. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, token, navigate]);

  const handleFavorites = async (id) => {
    try {
      if (favorites.includes(id)) {
        await removeFromFavorite(id);
        setFavorites((prev) => prev.filter((favId) => favId !== id));
      } else {
        await addToFavorite(id);
        setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  return (
    <div className="container">
      <img
        className="imageHeader"
        alt="rick and morty wiki"
        src={RickandMorty}
      />
      <button
        className="logoutButton"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
      {errorMessage && <ErrorMessage error={errorMessage} />}
      {loading ? (
        <p className="loading">Loading characters...</p>
      ) : (
        <>
          <div className="list">
            {characters?.map((character, index) => (
              <CharacterTile
                character={character}
                key={index}
                isFavorite={favorites.includes(character.id)}
                handleFavorites={() => handleFavorites(character.id)}
              />
            ))}
          </div>
          {characters?.length ? (
            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              setPageNumber={setPageNumber}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default CharacterList;
