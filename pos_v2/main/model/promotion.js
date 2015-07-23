function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.prototype.promotionItem = function (cartItem) {
  var promotions = loadPromotions();
  var barcodes ;

  for (var i = 0; i < promotions.length; i++) {
    var promotion = promotions[i];
    if (this.type === promotion.type) {
      barcodes = promotion.barcodes;
      break;
    }
  }

  switch (this.type) {
    case 'BUY_TWO_GET_ONE_FREE':
      return this.promotionOne(barcodes, cartItem) ;
  }

}
;

Promotion.prototype.promotionOne = function (barcodes, cartItem) {

  for (var i = 0; i < barcodes.length; i++) {
    var promotionPrice = 0;

    var item;

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
