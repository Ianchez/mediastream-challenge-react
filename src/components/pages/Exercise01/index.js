/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState } from 'react'
import MovieDetail from './components/MovieDetail';
import { movies } from './assets/movies';

const discountRules = [
  {
    m: [3, 2],
    discount: 0.25
  },
  {
    m: [2, 4, 1],
    discount: 0.5
  },
  {
    m: [4, 2],
    discount: 0.1
  } 
];

export default function Exercise01 () {
  const [cart, setCart] = useState({
    1: {
      id: 1,
      quantity: 2
    }
  })

  const addToCartHandler = (itemId) => {
    let cartItem = cart[itemId];
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = { id: itemId, quantity: 1 };
    }
    setCart({ ...cart, [itemId]: cartItem });
  };

  const decrementCartItem = (itemId) => {
    const cartItem = cart[itemId];
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        setCart({ ...cart, [itemId]: cartItem });
      } else {
        delete cart[itemId];
        setCart({ ...cart });
      }
    }
  };

  const movieList = movies.map(movie => (
    <li className="movies__list-card" key={`movie-${movie.id}-list`}>
      <MovieDetail movie={movie}/>
      <button onClick={() => addToCartHandler(movie.id)}>
        Add to cart
      </button>
    </li>
  ));

  const shoppingCart =  Object.values(cart).map(item => {
    const movie = movies.find(movie => movie.id === item.id);

    if (movie) {
      return (
        <li className="movies__cart-card" key={`movie-${movie.id}-cart-item`}>
          <MovieDetail movie={movie}/>
          <div className="movies__cart-card-quantity">
            <button onClick={() => decrementCartItem(movie.id)}>
              -
            </button>
            <span>
              {item.quantity}
            </span>
            <button onClick={() => addToCartHandler(movie.id)}>
              +
            </button>
          </div>
        </li>
      );
    }
  });

  const getTotal = () => 0 // TODO: Implement this

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movieList}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {shoppingCart}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  );
} 