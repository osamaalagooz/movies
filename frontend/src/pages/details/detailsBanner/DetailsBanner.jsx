import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import StarRating from "../../../components/StarRating/index.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import useAuth from "../../../hooks/useAuth";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishList,
  getWishList,
} from "../../../api/wishlist.js";
import { getMovie, rateMovie } from "../../../api/movie.js";
import {
  addToFavlist,
  removeFromFavList,
  getFavList,
} from "../../../api/favlist.js";

const DetailsBanner = ({ video }) => {
  const { isLoggedIn } = useAuth();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [data2, setData2] = useState(null);
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInFavlist, setIsInFavlist] = useState(false);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(isLoggedIn ? null : `/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = (isLoggedIn ? data2?.genres : data?.genres)?.map((g) => g.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const checkIfInWishlist = async () => {
    try {
      const wishlist = await getWishList();
      const isInList = wishlist.some(
        (item) => item?.referance_id === data2?.id
      );
      setIsInWishlist(isInList);
    } catch (error) {
      console.error("Failed to check wishlist:", error);
    }
  };

  const checkIfInFavlist = async () => {
    try {
      const favlist = await getFavList();
      const isInList = favlist.some((item) => item?.referance_id === data2?.id);
      setIsInFavlist(isInList);
    } catch (error) {
      console.error("Failed to check favlist:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await addToFavlist({ id: data2.id, data2 });
      console.log("Added to favorites");
      getData();
      setIsInFavlist(true);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  const handleRemoveFromFavlist = async () => {
    try {
      await removeFromFavList(data2.id);
      console.log("Removed from favorites");
      getData();
      setIsInFavlist(false);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWishlist({ id: data2.id, data2 });
      console.log("Added to wishlist");
      getData();
      setIsInWishlist(true);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishList(data2.id);
      console.log("Removed from wishlist");
      getData();
      setIsInWishlist(false);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleRating = async (newRating) => {
    try {
      await rateMovie({
        referance_id: data2?.id,
        rating: newRating,
      });
      setRating(newRating);
      setIsEditing(false);
      getData();
    } catch (error) {
      console.error("Failed to rate the movie:", error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const getData = async () => {
    try {
      const movieData = await getMovie(id);
      if (movieData) {
        setData2(movieData);
        setRating(movieData.rating);
      }
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && data2) {
      checkIfInWishlist();
      checkIfInFavlist();
    }
  }, [id, isLoggedIn, data2]);

  const renderContent = () => {
    const movieData = isLoggedIn ? data2 : data;

    if (!movieData) return null;

    return (
      <>
        <div className="backdrop-img">
          <Img src={url.backdrop + movieData.backdrop_path} />
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="content">
            <div className="left">
              {movieData.poster_path ? (
                <Img
                  className="posterImg"
                  src={url.backdrop + movieData.poster_path}
                />
              ) : (
                <Img className="posterImg" src={PosterFallback} />
              )}
            </div>
            <div className="right">
              <div className="title">
                {`${movieData.name || movieData.title} (${dayjs(
                  movieData?.release_date
                ).format("YYYY")})`}
              </div>
              <div className="subtitle">{movieData.tagline}</div>

              <Genres data={_genres} />

              <div className="row">
                <CircleRating rating={movieData.vote_average.toFixed(1)} />
                <div
                  className="playbtn"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}
                >
                  <PlayIcon />
                  <span className="text">Watch Trailer</span>
                </div>
              </div>

              {isLoggedIn && (
                <div className="row action-buttons">
                  {isInFavlist ? (
                    <button
                      className="action-button"
                      onClick={handleRemoveFromFavlist}
                    >
                      <FaHeart />
                      <span className="text">Remove from Favorites</span>
                    </button>
                  ) : (
                    <button
                      className="action-button"
                      onClick={handleAddToFavorites}
                    >
                      <FaHeart />
                      <span className="text">Add to Favorites</span>
                    </button>
                  )}
                  {isInWishlist ? (
                    <button
                      className="action-button"
                      onClick={handleRemoveFromWishlist}
                    >
                      <FaMinus />
                      <span className="text">Remove from Wishlist</span>
                    </button>
                  ) : (
                    <button
                      className="action-button"
                      onClick={handleAddToWatchlist}
                    >
                      <FaPlus />
                      <span className="text">Add to Wishlist</span>
                    </button>
                  )}
                </div>
              )}

              <div className="overview">
                <div className="heading">Overview</div>
                <div className="description">{movieData.overview}</div>
              </div>

              <div className="info">
                {movieData.status && (
                  <div className="infoItem">
                    <span className="text bold">Status: </span>
                    <span className="text">{movieData.status}</span>
                  </div>
                )}
                {movieData.release_date && (
                  <div className="infoItem">
                    <span className="text bold">Release Date: </span>
                    <span className="text">
                      {dayjs(movieData.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                )}
                {movieData.runtime && (
                  <div className="infoItem">
                    <span className="text bold">Runtime: </span>
                    <span className="text">
                      {toHoursAndMinutes(movieData.runtime)}
                    </span>
                  </div>
                )}
              </div>

              {isLoggedIn && (
                <div className="rating-section" style={{ margin: "20px 0" }}>
                  <div className="rating-header">
                    <span className="text bold">
                      {data2?.is_rated ? "Your Rate:" : "Rate this movie:"}
                    </span>
                    {data2?.is_rated && (
                      <button className="edit-button" onClick={toggleEditMode}>
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                    )}
                  </div>
                  <StarRating
                    rating={rating}
                    onRate={
                      data2?.is_rated && !isEditing ? () => {} : handleRating
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </ContentWrapper>
      </>
    );
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        renderContent()
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
