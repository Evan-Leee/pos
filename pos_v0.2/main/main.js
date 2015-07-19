function countSame(inputs,object){
  var count = 0;
  for(var i = 0; i < inputs.length; i++){
    if(object === inputs[i]){
      count ++;
    }
  }
  return count ;
}
function findSame(inputs,object){
  for(var i = 0; i < inputs.length; i++){
    if(object === inputs[i]){
      return inputs[i];
    }
  }
}

function delRepeater(inputs){
  var temp = [inputs[0]];
  for(var i = 1; i < inputs.length; i++){
    if(findSame(temp,inputs[i])){
      continue;
    }else{
      temp.push(inputs[i]);
    }
  }
  return temp;
}

function transform(inputs){
  var newInputs = [];
  for(var i = 0; i < inputs.length; i++){
    switch (inputs[i]){
      case 'ITEM000000':
            newInputs.push({
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00
            });
            break;
      case 'ITEM000001':
            newInputs.push({
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            });
            break;
      case 'ITEM000002':
            newInputs.push({
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
              });
            break;
      case 'ITEM000003':
            newInputs.push(
              {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              });
            break;
      case 'ITEM000004':
            newInputs.push(
              {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
              });
            break;
      case 'ITEM000005':
            newInputs.push(
              {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              })

    }
  }
  return newInputs;
}

function printReceipt(inputs) {
  var newInputs = transform(delRepeater(inputs));
  var list = '***<没钱赚商店>收据***\n';
  var total = 0;
  for(var i = 0; i < newInputs.length; i++){
    list = list + '名称：'+ newInputs[i].name
      +'，数量：'+ countSame(inputs,newInputs[i].barcode) + newInputs[i].unit
      +'，单价：'+ newInputs[i].price.toFixed(2)
      +'(元)，小计：'+ (countSame(inputs,newInputs[i].barcode) * newInputs[i].price).toFixed(2)
      +'(元)\n';
    total = total + countSame(inputs,newInputs[i].barcode) * newInputs[i].price;
  }
  list = list + '----------------------\n' +
    '总计：'+ total.toFixed(2) +'(元)\n' +
    '**********************';
  console.log(list);
}
