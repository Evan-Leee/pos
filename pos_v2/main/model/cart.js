/**
 * Created by evan on 15-7-23.
 */
function Cart() {

}

Cart.prototype.getCartItems = function (tags) {

  var cartItems = [];
  var realThis = this;

  tags.forEach(function (tag) {

    var barcode = tag.split('-')[0];

    var item = realThis.transformItem(barcode);

    var count = tag.split('-')[1] ? tag.split('-')[1] : 1;

    var cartItem = realThis.findCartItem(cartItems, item.barcode);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({item: item, count: count});
    }
  });

  return cartItems;

};

Cart.prototype.transformItem = function (barcode) {
  var allItems = loadAllItems();

  var foundItem;

  for (var i = 0; i < allItems.length; i++) {

    var item = allItems[i];

    if (item.barcode === barcode) {
      foundItem = item;
      break;
    }

  }
  return foundItem;
};

Cart.prototype.findCartItem = function (cartItems, barcode){

  var foundCartItem;

  for (var i = 0; i < cartItems.length; i++) {

    var cartItem = cartItems[i];

    var isExist = cartItem.item.barcode === barcode;

    if (isExist) {
      foundCartItem = cartItem;
      break;
    }

  }
  return foundCartItem;
};
