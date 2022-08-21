const MovieCard = ({ movie }) => (
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
);

export default MovieCard;