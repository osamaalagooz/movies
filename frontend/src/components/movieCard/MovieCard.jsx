import React from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { removeFromFavList } from "../../api/favlist";
import { removeFromWishList } from "../../api/wishlist";

const MovieCard = ({ data, fromSearch, mediaType, onRemove }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const location = useLocation();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  const genreIds = data.genre_ids || [];

  const handleRemoveFromFavlist = async () => {
    try {
      await removeFromFavList(data.id);
      if (onRemove) onRemove(data.id);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishList(data.id);
      if (onRemove) onRemove(data.id);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  return (
    <div
      className="movieCard"
      onClick={() =>
        location.pathname === "/me/wishlist" ||
        location.pathname === "/me/favlist"
          ? null
          : navigate(`/${data.media_type || mediaType}/${data.id}`)
      }
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average?.toFixed(1)} />
            <Genres data={genreIds.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
        {location.pathname === "/me/favlist" && (
          <button
            className="removeBtn"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromFavlist();
            }}
          >
            Remove from Favorites
          </button>
        )}
        {location.pathname === "/me/wishlist" && (
          <button
            className="removeBtn"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromWishlist();
            }}
          >
            Remove from WishList
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
