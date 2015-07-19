function printReceipt(inputs) {
  var list = '***<没钱赚商店>收据***\n';
  var total = 0;
  for(var i = 0; i < inputs.length; i++){
    list = list + '名称：'+ inputs[i].name
      +'，数量：'+ inputs[i].count + inputs[i].unit
      +'，单价：'+ inputs[i].price.toFixed(2)
      +'(元)，小计：'+ (inputs[i].count * inputs[i].price).toFixed(2)
      +'(元)\n';
    total = total + inputs[i].count * inputs[i].price;
  }
  list = list + '----------------------\n' +
    '总计：'+ total.toFixed(2) +'(元)\n' +
    '**********************';
  console.log(list);
}
