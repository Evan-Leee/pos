function printReceipt(barcodes) {

  var items = getItems(barcodes);

  var cartItems = getCartItems(items);

  var receipt =

    '***<没钱赚商店>收据***\n' +
    getItemString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}


function formatPrice(price) {
  return price.toFixed(2);
}

function getItemString(cartItems) {
  var itemString = '';
  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    itemString += '名称：' + item.name
      + '，数量：' + cartItem.count + item.unit
      + '，单价：' + formatPrice(item.price)
      + '(元)，小计：' + formatPrice(cartItem.count * item.price)
      + '(元)\n';

  });

  return itemString;
}


function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (cartItem) {
    amount += getSubTotal(cartItem.count, cartItem.item.price);
  });

  return amount;
}


function getSubTotal(count, price) {
  return count * price;
}

function getCartItems(items) {
  var cartItems = [];
  items.forEach(function (item) {
    var cartItem = findItem(cartItems, item.barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({item: item, count: 1});
    }
  });
  return cartItems;
}


function findItem(cartItems, barcode) {
  var foundCartItem;
  for (var i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    if (cartItem.item.barcode === barcode) {
      foundCartItem = cartItem;
      break;
    }
  }

  return foundCartItem;
}


function transformItem(barcode) {
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
}

function getItems(barcodes){
  var items = [];
  barcodes.forEach(function(barcode){
    var item = transformItem(barcode);
    items.push(item);
  })
  return items;
}
