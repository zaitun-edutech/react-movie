import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import searchIcon from "./search.svg";
import "./App.css";
const apiUrl = "https://omdbapi.com/?apikey=c486fd65";
const App = () => {
  //c486fd65
  let [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovie = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
    document.getElementById("search").value = "";
  };
  useEffect(() => {
    searchMovie(searchItem);
  }, []);
  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          type="text"
          name=""
          id="search"
          placeholder="Search for a movie"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovie(searchItem)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
