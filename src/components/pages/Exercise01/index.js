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
import { movies } from './utils/movies';
import { getTotal, discountRules } from './utils/cart';
import MovieCartCard from './components/MovieCartCard';
import MovieListCard from './components/MovieListCard';

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

  const decrementCartItemHandler = (itemId) => {
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

  const movieList = movies.map(movie => 
    <MovieListCard movie={movie} onClickAdd={addToCartHandler} />
  );

  const shoppingCart = Object.values(cart).map(item =>
    <MovieCartCard item={item} onDecrementClick={decrementCartItemHandler} onIncrementClick={addToCartHandler} />
  );

  const discountsDetails = discountRules.map(discount => 
    <li className="discounts__detail-card" key={`discount-${discount.m.join('')}-detail`}>
      <ul>
        <li>Combine IDs {discount.m.join(', ')}</li>
        <li>to get {discount.discount * 100}% discount!</li>
      </ul>
    </li>
  );

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
          <p>Total: ${getTotal(cart, movies)}</p>
        </div>
      </div>
      <div className='discounts_list'>
        <ul>
          {discountsDetails}
        </ul>
      </div>
    </section>
  );
}
