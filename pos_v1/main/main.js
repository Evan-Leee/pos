function printReceipt(tags) {

  var cartItems = getCartItems(tags);

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

function getCartItems(tags) {
  var cartItems = [];
  tags.forEach(function (tag) {
    var barcode = tag.split('-')[0];

    var item = transformItem(barcode);

    var count = tag.split('-')[1] ? tag.split('-')[1] : 1;

    var cartItem = findCartItem(cartItems, item.barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({item: item, count: count});
    }
  });
  return cartItems;
}


function findCartItem(cartItems, barcode) {
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

function promotionItem(cartItem) {
  var promotions = loadPromotions();
  var promotionPrice = 0;
  var item;
  var barcodes = promotions[0].barcodes;
  for (var i = 0; i < barcodes.length; i++) {
    var barcode = barcodes[i];

    var promotionTimes = Math.floor(cartItem.count / 3);

    var isPromotion = cartItem.item.barcode === barcode;

    if (isPromotion) {
      item = cartItem.item;
      promotionPrice = item.price * promotionTimes;
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
  return {string: promotionString, reduce: reduce};
}
