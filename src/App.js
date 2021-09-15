/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./index.css";
import Movie from "./components/Movie";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=fc57d4af23821994366390a4bcf83dad&query=${searchTerm}&page=${page}`;
  const MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b18136eb6b076d027ee6d423a60e5219&page=${page}`;

  useEffect(() => {
    getMovies(searchTerm ? SEARCH : MOVIES);
  }, [page]);

  useEffect(() => {
    let delay = null;

    if (searchTerm) {
      delay = setTimeout(() => {
        getMovies(SEARCH);
      }, 2000);
    }

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setMaxPage(data.total_pages);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginRight: "30px" }}> 🐒</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        <h2 style={{ marginLeft: "30px" }}> 🐒</h2>
      </header>
      <div className="movie-container">
        {movies?.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      <Pagination
        style={{ alignSelf: "center" }}
        count={maxPage}
        color="secondary"
        page={page}
        onChange={(_, page) => setPage(page)}
      />
    </div>
  );
}

export default App;
