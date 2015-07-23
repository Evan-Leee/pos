function Receipt() {
  this.itemString = '';
  this.promotionString = '';
  this.reduce = 0;
}

Receipt.prototype.setItemString = function (cartItems){
    var that = this;
    var promotion = loadPromotions()[0];

    cartItems.forEach(function (cartItem) {
      var item = cartItem.item;
      var promotedItem = promotion.promotionItem(cartItem);
      that.itemString +=
          '名称：' + item.name
        + '，数量：' + cartItem.count + item.unit
        + '，单价：' + Utils.formatPrice(item.price)
        + '(元)，小计：' + Utils.formatPrice(cartItem.count * item.price - promotedItem.price)
        + '(元)\n';

    });

};

Receipt.prototype.setPormotionString = function (cartItems){
  var that = this;

  cartItems.forEach(function (cartItem) {

    var promotion = loadPromotions()[0];//后期改进,需根据inputs判断优惠类型,给promotion赋值

    var isPromotion = promotion.promotionItem(cartItem);

    if (isPromotion.item) {
        that.promotionString +=
        '名称：' + isPromotion.item.name +
        '，数量：' + isPromotion.promotionTime + isPromotion.item.unit + '\n';
        that.reduce += cartItem.item.price;
    }
  });

};
