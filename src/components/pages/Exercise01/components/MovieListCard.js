import MovieDetail from "./MovieDetail";

const MovieListCard = ({ movie, onClickAdd }) => (
  <li className="movies__list-card" key={`movie-${movie.id}-list`}>
    <MovieDetail movie={movie}/>
    <button onClick={() => onClickAdd(movie.id)}>
      Add to cart
    </button>
  </li>
);

export default MovieListCard;