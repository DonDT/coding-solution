import Movie from './Movie'
import '../styles/movies.scss'
import useLoadMore from './useLoadMore';
import { fetchMovies } from '../data/moviesSlice';
import { useSelector } from 'react-redux';


const Movies = ({ movies, viewTrailer, searchQuery }) => {
  const state = useSelector((state) => state);
  const { movies:initialState } = state;
  
  const isSearch = initialState.isSearch;
  const [page, isLoading, hasMoreItems, fetchMoreMovies]  = useLoadMore(1, fetchMovies, isSearch, searchQuery);

  return (
    <>
      <div data-testid="movies" className='container'>
        {movies.results?.map((movie, index) => (
          <Movie 
            movie={movie} 
            key={`${movie.id}-${index}`}
            viewTrailer={viewTrailer}
          />
        ))}
      </div>
      <div className="div-container">
        {hasMoreItems ? (
          <button onClick={fetchMoreMovies} disabled={isLoading} className="custom-button">
            {isLoading ? "Loading..." : "Load More Movies"}
          </button>
        ) : (
          <p>No more movies to fetch.</p>
        )}
      </div>
    </>  
  );
}

export default Movies;

