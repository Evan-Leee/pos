function Scanner(){

}

Scanner.prototype.scan = function (tag) {
  var barcode = tag.split('-')[0];

  var count = tag.split('-')[1] || 1;
  count = parseFloat(count);

  var item = Item.find(barcode);

  var cartItem = new CartItem(item, count);

  return cartItem;

}
