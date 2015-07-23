/**
 * Created by evan on 15-7-23.
 */
function Cart() {
  this.cartItems = [];
}

Cart.prototype.addCartItem = function (cartItem) {

  var cartItems = this.cartItems;

  var isExist = this.findCartItem(cartItems, cartItem);

    if (isExist) {
      isExist.count++;
    } else {
      cartItems.push(cartItem);
    }

};


Cart.prototype.findCartItem = function (cartItems, cartItem){

  var foundCartItem;

  for (var i = 0; i < cartItems.length; i++) {

    var isExist = cartItems[i].item.barcode === cartItem.item.barcode;

    if (isExist) {
      foundCartItem = cartItems[i];
      break;
    }

  }
  return foundCartItem;
};

Cart.getAmount = function (cartItems) {
  var amount = 0;

  cartItems.forEach(function (cartItem) {
    amount += Utils.getSubTotal(cartItem.count, cartItem.item.price);
  });
  return amount;
};
