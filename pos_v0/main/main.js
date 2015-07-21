function printReceipt(items) {

  var receipt = '';

  receipt +=
    '***<没钱赚商店>收据***\n' +
    getItemString(items) +
    '----------------------\n' +
    '总计：'+ formatPrice(getamount(items)) +'(元)\n' +
    '**********************';
  console.log(receipt);
}


function formatPrice(price){
  return price.toFixed(2);
}

function getItemString(items){
  var itemString = '';

  items.forEach(function(item){
    itemString += '名称：'+ item.name
      +'，数量：'+ item.count + item.unit
      +'，单价：'+ formatPrice(item.price)
      +'(元)，小计：'+ formatPrice(item.count * item.price)
      +'(元)\n';

  })

  return itemString;
}

function getamount(items){
  var amount = 0;

  items.forEach(function(item){
    amount += getSubTotal(item.count,item.price);
  })

  return amount;
}

function getSubTotal(count,price){
  return count * price;
}
