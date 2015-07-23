function printReceipt(tags) {
  var cart = new Cart();
  var scanner = new Scanner();
  var pos = new Pos(cart, scanner);

  pos.setCartItems(tags);

  var cartItems = pos.cart.cartItems;

  pos.receipt.setItemString(cartItems);

  pos.receipt.setPormotionString(cartItems);


  var list =

    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Utils.date() + '\n' +
    '----------------------\n' +
     pos.receipt.itemString+
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    pos.receipt.promotionString +
    '----------------------\n' +
    '总计：' + Utils.formatPrice(Cart.getAmount(cartItems) - pos.receipt.reduce) + '(元)\n' +
    '节省：' + Utils.formatPrice(pos.receipt.reduce) + '(元)\n' +
    '**********************';

  console.log(list);
}
