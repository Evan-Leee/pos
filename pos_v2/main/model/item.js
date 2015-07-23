function Item(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
}

Item.all = function () {
  return loadPromotions();
};

Item.find = function (barcode) {
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
