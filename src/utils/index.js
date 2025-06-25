const formatPrice = (price) => {
  return `$${price.toLocaleString()}`;
};

const getPartialPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const getLowestCostProduct = (products) => {
  return products.reduce((min, p) => {
    return p.price < min.price ? p : min;
  });
};

const discount25 = (products) => {
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const totalWithDiscount = subtotal * 0.25;
  const descType = "25% OFF";
  return { totalWithDiscount, descType };
};

const checkApplicableDiscount = (products, clients, promotionalDate) => {
  let promotionDay =
    new Date(promotionalDate.date).toDateString() === new Date().toDateString();

  if (clients.vip) {
    let minPrice = getLowestCostProduct(products);
    const descType = "Producto bonificado + $500";
    const totalWithDiscount = minPrice.price + 500;
    return { totalWithDiscount, descType };
  }
  if (!clients.vip && promotionDay) {
    const descType = "Dia de Promo: - $300";
    const totalWithDiscount = 300;
    return { totalWithDiscount, descType };
  }

  if (!clients.vip) {
    const descType = "Descuento carrito comun";
    const totalWithDiscount = 100;
    return { totalWithDiscount, descType };
  }
};

export {
  formatPrice,
  getPartialPrice,
  getLowestCostProduct,
  discount25,
  checkApplicableDiscount,
};
