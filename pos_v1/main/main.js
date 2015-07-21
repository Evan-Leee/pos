function printReceipt(barcodes) {
  var cartItems = getCartItems(barcodes);
  var promotion = getPromotion(cartItems);
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    promotion.string+
    '----------------------\n' +
    '总计：'+ formatPrice(getAmount(cartItems)) +'(元)\n' +
    '节省：'+ formatPrice(promotion.reduce) +'(元)\n' +
    '**********************';
  console.log(receipt);
}


function formatPrice(price){
  return price.toFixed(2);
}


function getItemString(cartItems){
  var itemString = '';

  cartItems.forEach(function(cartItem){
    var item = cartItem.item;
    var promotion = promotionItem(cartItem);
    itemString += '名称：'+ item.name
      +'，数量：'+ cartItem.count + item.unit
      +'，单价：'+ formatPrice(item.price)
      +'(元)，小计：'+ formatPrice(promotion.price)
      +'(元)\n';

  });

  return itemString;
}

function getPromotion(cartItems){
  var promotionString ='';
  var reduce = 0;
  cartItems.forEach(function(cartItem){
    var promotion = promotionItem(cartItem);
    if(promotion.item){
      promotionString += '名称：'+ promotion.item.name +
                         '，数量：1'+ promotion.item.unit +'\n'
      reduce += cartItem.item.price;
    }
  })
  return {string : promotionString, reduce : reduce}
}


function getAmount(cartItems){
  var amount = 0;

  cartItems.forEach(function(cartItem){
    var promotion = promotionItem(cartItem);
    amount += promotion.price;
  });

  return amount;
}



function getSubTotal(count,price){
  return count * price;
}

function getCartItems(barcodes){
  var cartItems = [];
  barcodes.forEach(function(barcode){
    var stdBarcode = barcode.substring(0,10);
    var cartItem = findItem(cartItems,stdBarcode);
    if(cartItem){
      cartItem.count ++;
    }else if(barcode.charAt(10)){

      cartItems.push({
        item:transformItem(stdBarcode),
        count:barcode.substring(11) - 0
      });

    }else{
      cartItems.push({item:transformItem(stdBarcode),count:1});
    }
  });
  return cartItems;
}

function findItem(cartItems, barcode){
  var foundCartItem;
  for(var i = 0; i < cartItems.length; i++){
    var cartItem = cartItems[i];
    if(cartItem.item.barcode === barcode){
      foundCartItem = cartItem;
      break;
    }
  }
  return foundCartItem;
}


function transformItem(barcode){
  var allItems =loadAllItems();
  var foundItem ;
  for(var i = 0; i < allItems.length; i++){
    var item = allItems[i];
    if(item.barcode === barcode){
      foundItem = item;
      break;
    }
  }

  return foundItem;
}

function promotionItem(cartItem){
  var promotions = loadPromotions();
  var promotionPrice = cartItem.count * cartItem.item.price;
  var item;
  var barcodes = promotions[0].barcodes
  for(var i = 0; i < barcodes.length; i++){
    var barcode = barcodes[i];
    if(cartItem.item.barcode === barcode && cartItem.count >= 2){
      item = cartItem.item;
      promotionPrice -= item.price;
      break;
    }
  }
  return {price : promotionPrice,item : item};
}

