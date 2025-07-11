import React, { useState } from "react";
import fallBackImage from "../../../images/morty-no-image-found.png";
import "./charactertile.scss";

const CharacterTile = ({ character, isFavorite, handleFavorites }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    name,
    status,
    image,
    species,
    type,
    origin: { name: originName },
    location: { name: locationName },
    gender,
  } = character;

  return (
    <div className="tile">
      <img
        className="image"
        src={image}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallBackImage;
        }}
      />
      <h3 className="name">{name}</h3>
      <div className="buttons-container">
        <button className="buttons" onClick={handleFavorites}>
          {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
        </button>
        <button
          className="buttons"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {expanded && (
        <div className="details">
          <p>Status: {status}</p>
          <p>Species: {species}</p>
          <p>Type: {type || "Unknown"}</p>
          <p>Gender: {gender}</p>
          <p>Origin: {originName}</p>
          <p>Location: {locationName}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterTile;
