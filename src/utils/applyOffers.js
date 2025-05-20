const applyOffers = (items) => {
  const paidItems = items.filter(item => !item.isFree);
  const updatedItems = [...paidItems];

  const getQuantity = (keyword) =>
    paidItems
      .filter(item => item.name.toLowerCase().includes(keyword))
      .reduce((sum, item) => sum + item.quantity, 0);

  const cokeCount = getQuantity("coca-cola")
  if (cokeCount >= 6) {
    updatedItems.push({
      id: "free-coke",
      name: "Coca Cola",
      price: 0,
      quantity: 1,
      isFree: true,
      img: "https://py-shopping-cart.s3.eu-west-2.amazonaws.com/coca-cola.jpeg"

    });
  }

  const croissantCount = getQuantity("croissant");
  if (croissantCount >= 3) {
    updatedItems.push({
      id: "free-coffee",
      name: "Coffee",
      price: 0,
      quantity: 1,
      isFree: true,
      img: "https://py-shopping-cart.s3.eu-west-2.amazonaws.com/coffee.jpeg"

    });
  }

  return updatedItems;
};

export default applyOffers