import { movies } from "../utils/movies";
import MovieDetail from "./MovieDetail";

const MovieCartCard = ({ item, onDecrementClick, onIncrementClick }) => {
  const movie = movies.find(movie => movie.id === item.id);
  if (movie) {
    return (
      <li className="movies__cart-card" key={`movie-${movie.id}-cart-item`}>
        <MovieDetail movie={movie}/>
        <div className="movies__cart-card-quantity">
          <button onClick={() => onDecrementClick(movie.id)}>
            -
          </button>
          <span>
            {item.quantity}
          </span>
          <button onClick={() => onIncrementClick(movie.id)}>
            +
          </button>
        </div>
      </li>
    );
  }
};

export default MovieCartCard;