function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.prototype.promotionItem = function (cartItem){
  var promotions = loadPro motions();
  var promotionPrice = 0;
  var item;
  var barcodes = promotions[0].barcodes;
  for (var i = 0; i < barcodes.length; i++)  {
    var barcode = barcodes[i];

    var promotionTimes = Math.floor(cartItem.count / 3);

    var isPromotion = cartItem.item.barcode === barcode;

    if (isPromotion) {
      item = cartItem.item;
      promotionPrice = item.price * promotionTimes;
      break;
    }
  }
  return {price: promotionPrice, item: item, promotionTimes: promotionTimes};
};

Promotion.prototype.isPromotion = function () {

};
