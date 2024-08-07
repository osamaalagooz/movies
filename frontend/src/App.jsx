import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import FavlistPage from "./pages/me/favlist";
import AuthGuard from "./components/route-guard/AuthGuard";
import { JWTProvider } from "./contexts/JWTContext";
import GuestGuard from "./components/route-guard/GuestGuard";
import Profile from "./pages/me/profile";
import WishlistPage from "./pages/me/wishlist";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./components/error/FallbackComponent";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <JWTProvider>
        <Header />
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/">
              <Route
                path="login"
                element={
                  <GuestGuard>
                    <Login />
                  </GuestGuard>
                }
              />
              <Route
                path="register"
                element={
                  <GuestGuard>
                    <Register />
                  </GuestGuard>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />

            <Route path="/me/">
              <Route path="" element={<Navigate to={"/me/favlist"} />} />
              <Route
                path="favlist"
                element={
                  <AuthGuard>
                    <FavlistPage />
                  </AuthGuard>
                }
              />
              <Route
                path="wishlist"
                element={
                  <AuthGuard>
                    <WishlistPage />
                  </AuthGuard>
                }
              />
              <Route
                path="profile"
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </JWTProvider>
    </BrowserRouter>
  );
}

export default App;
