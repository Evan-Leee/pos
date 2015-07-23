/**
 * Created by evan on 15-7-23.
**/
function Pos(cart, scanner) {
  this.cart = cart;
  this.scanner = scanner;
  this.receipt = new Receipt();
 }

Pos.prototype.setCartItems = function (tags) {

  for (var i = 0; i < tags.length; i++){

    var cartItem = this.scanner.scan(tags[i]);

    this.cart.addCartItem(cartItem);

  }

}
