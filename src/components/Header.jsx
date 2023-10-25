import { Link, NavLink } from "react-router-dom"
import { useSelector , useDispatch} from 'react-redux'

import '../styles/header.scss'
import { useState } from "react"
import { setSearchFlag } from "../data/moviesSlice"

const Header = ({ searchMovies }) => {
  
  const { starredMovies } = useSelector((state) => state.starred)
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  const searchMoviesWIthSearchTerm = (e) => {
    const searchTerm = e.target.value;
    e.preventDefault();
    setSearchString(searchTerm)
  }

  const currentPath = window.location.pathname;


  return (
    <header>
      <Link 
        to="/" 
        data-testid="home" 
        onClick={() => {
          searchMovies('');
          setSearchString('');
          dispatch(setSearchFlag(false));
        }}
        >
        <i className="bi bi-film" />
      </Link>

     <div className="right-header-content"> 
     {
        currentPath !== '/starred' && currentPath !== '/watch-later' &&
        <div className="input-group rounded">
            <input
              type="search"
              data-testid="search-movies"
              value={searchString}
              onChange={searchMoviesWIthSearchTerm}
              className="form-control rounded"
              placeholder="Search movies..."
              aria-label="Search movies"
              aria-describedby="search-addon"
            />
            <button 
              type="submit"
              onClick={() => searchMovies(searchString)}
            >
              Search
            </button>

      </div> 
      }
      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch later
        </NavLink>
      </nav>  
      </div>           
    </header>
  )
}

export default Header
