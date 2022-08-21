export const MOVIE_ORDER_BY = {
  YearAsc: 'Year Ascending',
  YearDesc: 'Year Descending',
};

export const filterMoviesByGenre = (moviesArray, genre) => moviesArray.filter(movie => movie.genres.includes(genre));

export const orderMovies = (moviesArray, orderBy) => {
  if (orderBy === MOVIE_ORDER_BY.YearAsc) {
    return moviesArray.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }

  if (orderBy === MOVIE_ORDER_BY.YearDesc) {
    return moviesArray.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  return moviesArray;
};
