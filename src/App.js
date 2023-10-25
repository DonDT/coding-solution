import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, setSearchFlag } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import Modal from "./components/Modal";
import "./app.scss";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => setOpen(false);

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
      dispatch(setSearchFlag(true));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams("");
      dispatch(setSearchFlag(false));
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };

  const viewTrailer = (movie) => {
    setLoadingTrailer(true);
    getMovie(movie.id);

    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
    setLoadingTrailer(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {videoKey && <YouTubePlayer videoKey={videoKey} />}
          {!videoKey && !loadingTrailer && (
            <div className="no-video-trailer">
              <h6>No trailer available. Try another movie</h6>
            </div>
          )}
        </Modal>
      )}
      <div className="App">
        <Header searchMovies={searchMovies} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Movies
                  movies={movies}
                  viewTrailer={viewTrailer}
                  searchQuery={searchQuery}
                />
              }
            />

            <Route
              path="/starred"
              element={<Starred viewTrailer={viewTrailer} />}
            />
            <Route
              path="/watch-later"
              element={<WatchLater viewTrailer={viewTrailer} />}
            />
            <Route
              path="*"
              element={<h1 className="not-found">Page Not Found</h1>}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
