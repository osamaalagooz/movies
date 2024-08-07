import React, { useState, useEffect } from "react";

import "./index.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";
import { getWishList } from "../../../api/wishlist";

const WishList = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);

  const fetchWishListData = async () => {
    setLoading(true);
    try {
      const wishlist = await getWishList();
      setData({ results: wishlist });
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
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
    fetchWishListData();
  };

  useEffect(() => {
    fetchWishListData();
  }, []);

  return (
    <div className="wishlistPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">Your WishList</div>
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
              <span className="resultNotFound">Your wish is empty!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default WishList;
