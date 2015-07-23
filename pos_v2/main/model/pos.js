/**
 * Created by evan on 15-7-23.
 */
function Pos(){

}
Pos.prototype.handlePormotion = function (cartItems){

  var promotionString = '';
  var reduce = 0;

  cartItems.forEach(function (cartItem) {

    var promotion = loadPromotions()[0];//后期改进,需根据inputs判断优惠类型,给promotion赋值

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
