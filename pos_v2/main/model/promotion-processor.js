/**
 * Created by evan on 15-7-23.
 */
function PromotionPeocessor() {

}

PromotionPeocessor.promotionOne = function (barcodes, cartItem) {
  var promotionPrice = 0;
  var item;

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
  return {price: promotionPrice, item: item, promotionTime: promotionTimes};
};
