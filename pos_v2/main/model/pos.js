/**
 * Created by evan on 15-7-23.
 */
function Pos(){

}

Pos.prototype.transformItem = function (barcode){
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

Pos.prototype.handleInput = function (tags){
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



Pos.prototype.findCartItem = function (cartItems, barcode){
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

Pos.prototype.handlePormotion = function (cartItems){
  var promotionString = '';
  var reduce = 0;
  cartItems.forEach(function (cartItem) {
    var promotion = new Promotion();
    var isPromotion = promotion.promotionItem(cartItem);

    if (isPromotion.item) {
      promotionString +=
        '名称：' + isPromotion.item.name +
        '，数量：' + isPromotion.promotionTimes + isPromotion.item.unit + '\n';
      reduce += cartItem.item.price;
    }
  });
  return {string: promotionString, reduce: reduce};
};

Pos.prototype.handleOutput = function (cartItems){

    var itemString = '';
    var promote = loadPromotions()[0];
    var realThis = this;
    cartItems.forEach(function (cartItem) {
      var item = cartItem.item;
      var promotedItem = promote.promotionItem(cartItem);
      itemString += '名称：' + item.name
        + '，数量：' + cartItem.count + item.unit
        + '，单价：' + realThis.formatPrice(item.price)
        + '(元)，小计：' + realThis.formatPrice(cartItem.count * item.price - promotedItem.price)
        + '(元)\n';

    });

    return itemString;

};

Pos.prototype.formatPrice = function (price) {
  return price.toFixed(2);
};

Pos.prototype.getAmount = function (cartItems) {
  var amount = 0;
  var realThis = this;
  cartItems.forEach(function (cartItem) {
    amount += realThis.getSubTotal(cartItem.count, cartItem.item.price);
  });

  return amount;
};

Pos.prototype.getSubTotal = function (count, price) {
  return count * price;
}

Pos.prototype.date = function (){

  var currentDate = new Date(),
    year = this.dateDigitToString(currentDate.getFullYear()),
    month = this.dateDigitToString(currentDate.getMonth() + 1),
    date = this.dateDigitToString(currentDate.getDate()),
    hour = this.dateDigitToString(currentDate.getHours()),
    minute = this.dateDigitToString(currentDate.getMinutes()),
    second = this.dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

  return formattedDateString;
};

Pos.prototype.dateDigitToString = function (num){
  return num < 10 ? '0' + num : num;
};
