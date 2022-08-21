/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import { getMovies } from './api/movies';
import { getGenres } from "./api/genres";

import { MOVIE_ORDER_BY, orderMovies, filterMoviesByGenre } from "./utils/movies";

export default function Exercise02 () {
  const [genres, setGenres] = useState(['Search by genre...']);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(MOVIE_ORDER_BY.YearDesc);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenresFetch = () => {
    setLoading(true);
    getGenres().then(response => {
      setGenres(response);
      setSelectedGenre(response[0]);
      setLoading(false);
    })
  };

  const handleMoviesFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    getMovies().then(response => {
      setMovies(response);
      setLoading(false)
    });
  };

  useEffect(() => {
    handleGenresFetch();
    handleMoviesFetch();
  }, []);

  const setMovieOrderHandler = () => {
    if (selectedOrder === MOVIE_ORDER_BY.YearAsc) setSelectedOrder(MOVIE_ORDER_BY.YearDesc); 
    if (selectedOrder === MOVIE_ORDER_BY.YearDesc) setSelectedOrder(MOVIE_ORDER_BY.YearAsc); 
  }

  const genreSelector = (
    <select
      name="genre"
      placeholder="Search by genre..."
      onChange={(event) => setSelectedGenre(event.target.value)}
      className="green-input selector"
    >
      {genres.map(genre => <option value={genre} key={`${genre}-option`}>{genre}</option>)}
    </select>
  );

  return (
    <>
      <section className="movie-library-header">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          {genreSelector}
          <button
            className="green-input button"
            onClick={() => setMovieOrderHandler()}
          >
            {selectedOrder}
          </button>
        </div>
      </section>
      <section className="movie-library-body">
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : orderMovies(filterMoviesByGenre(movies, selectedGenre), selectedOrder).map(movie => (
          <div
            className="movie-library__card"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 40%, rgba(170, 235, 80, 0.8) 75%, rgba(170, 235, 80, 0.95) 90%), url(${movie.posterUrl})` }}
          >
            <ul>
              <li>{movie.title}</li>
              <li>{movie.genres.join(', ')}</li>
              <li>{movie.year}</li>
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}


