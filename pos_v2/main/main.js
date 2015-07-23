function printReceipt(tags) {
  var pos = new Pos();

  var cart = new Cart();

  var cartItems = cart.getCartItems(tags);

  var promotion = pos.handlePormotion(cartItems);

  var output = pos.handleOutput(cartItems);

  var date = pos.date();

  var receipt =

    '***<没钱赚商店>收据***\n' +
    '打印时间：' + date + '\n' +
    '----------------------\n' +
     output+
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    promotion.string +
    '----------------------\n' +
    '总计：' + pos.formatPrice(pos.getAmount(cartItems) - promotion.reduce) + '(元)\n' +
    '节省：' + pos.formatPrice(promotion.reduce) + '(元)\n' +
    '**********************';

  console.log(receipt);
}
