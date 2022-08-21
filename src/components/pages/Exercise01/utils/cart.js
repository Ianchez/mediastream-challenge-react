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

const calculateDiscountFactor = (itemsIds) => {
  let totalDiscount = 0;
  discountRules.forEach(rule => {
    if (rule.m.every(id => itemsIds.includes(id))) {
      totalDiscount += rule.discount;
    }
  });
  return totalDiscount;
};

export const getTotal = (currentCart, movies) => {
  let total = 0;
  const itemsIds = [];
  Object.values(currentCart).map(item => {
    const movie = movies.find(movie => movie.id === item.id);
    if (movie) {
      total += movie.price * item.quantity;
      itemsIds.push(item.id);
    }
  });
  const discount = calculateDiscountFactor(itemsIds);
  return total - total * discount;
};