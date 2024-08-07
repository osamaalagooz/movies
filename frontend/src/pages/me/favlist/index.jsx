import React, { useState, useEffect } from "react";

import "./index.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";
import { getFavList } from "../../../api/favlist";

const FavlistPage = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);

  const fetchFavListData = async () => {
    setLoading(true);
    try {
      const favlist = await getFavList();
      setData({ results: favlist });
    } catch (error) {
      console.error("Failed to fetch favorite list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromList = (id) => {
    setData((prevData) => ({
      results: prevData.results.filter(
        (item) => typeof item.movie === "object" && item.movie.id !== id
      ),
    }));
    fetchFavListData();
  };

  useEffect(() => {
    fetchFavListData();
  }, []);

  return (
    <div className="wishlistPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">Your Favlist</div>
              <div className="content">
                {data?.results.map((item) => {
                  if (typeof item.movie === "object") {
                    return (
                      <MovieCard
                        key={item._id}
                        data={item.movie}
                        onRemove={handleRemoveFromList}
                      />
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <div className="noResults">
              <span className="resultNotFound">Your favlist is empty!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default FavlistPage;
