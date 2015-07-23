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

  if (this.type === 'BUY_TWO_GET_ONE_FREE') {
      return PromotionPeocessor.promotionOne(barcodes, cartItem) ;
  }

};
