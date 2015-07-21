function printReceipt(barcodes) {

  var items = getItems(barcodes);

  var cartItems = getCartItems(items);

  var promotion = getPromotion(cartItems);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    promotion.string +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems) - promotion.reduce) + '(元)\n' +
    '节省：' + formatPrice(promotion.reduce) + '(元)\n' +
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
    var promotedItem = promotionItem(cartItem);
    itemString += '名称：' + item.name
      + '，数量：' + cartItem.count + item.unit
      + '，单价：' + formatPrice(item.price)
      + '(元)，小计：' + formatPrice(cartItem.count * item.price - promotedItem.price)
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
    var cartItem = findItem(cartItems, item.item.barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push(item);
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

function getItems(barcodes) {
  var items = [];
  barcodes.forEach(function (barcode) {
    var stdBarcode = barcode.substring(0, 10);
    var item = transformItem(stdBarcode);
    var count = 1;
    if (barcode.charAt(10)) {
      count = barcode.substring(11) - 0;
    }

    items.push({item: item, count: count});
  });
  return items;
}

function promotionItem(cartItem) {
  var promotions = loadPromotions();
  var promotionPrice = 0;
  var item;
  var barcodes = promotions[0].barcodes;
  for (var i = 0; i < barcodes.length; i++) {
    var barcode = barcodes[i];
    if (cartItem.item.barcode === barcode && cartItem.count >= 2) {
      item = cartItem.item;
      promotionPrice = item.price;
      break;
    }
  }
  return {price: promotionPrice, item: item};
}

function getPromotion(cartItems) {
  var promotionString = '';
  var reduce = 0;
  cartItems.forEach(function (cartItem) {
    var promotion = promotionItem(cartItem);
    if (promotion.item) {
      promotionString +=
        '名称：' + promotion.item.name +
        '，数量：1' + promotion.item.unit + '\n';
      reduce += cartItem.item.price;
    }
  });
  return {string: promotionString, reduce: reduce}
}
