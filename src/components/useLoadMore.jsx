import { useState } from 'react';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';
import { useDispatch } from "react-redux";


const useLoadMore = (initialPage, fetchFunction, isSearch, searchQuery) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const fetchMoreMovies = async () => {
    setIsLoading(true);
  
    try {
      let response;
  
      if (!isSearch) {
        response = await dispatch(fetchFunction(`${ENDPOINT_DISCOVER}&page=${page + 1}`));
      } else {
        response = await dispatch(fetchFunction(`${ENDPOINT_SEARCH}&page=${page + 1}&query=${searchQuery}`));
      }
  
      setIsLoading(false);
  
      if (response) {
        const newMovies = response.payload.results;
        if (newMovies.length === 0) {
          setHasMoreItems(false);
        } else {
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  return [page, isLoading, hasMoreItems, fetchMoreMovies];
};

export default useLoadMore;
