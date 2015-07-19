function count(inputs,object){
  var count = 0;
  for(var i = 0; i < inputs.length; i++){
    if(object.name === inputs[i].name){
      count ++;
    }
  }
  return count ;
}
function find(inputs,object){
  for(var i = 0; i < inputs.length; i++){
    if(object.barcode === inputs[i].barcode){
      return true;
    }
  }
}

function delRepeater(inputs){
  var temp = [inputs[0]];
  for(var i = 1; i < inputs.length; i++){
    if(find(temp,inputs[i])){
      continue;
    }else{
      temp.push(inputs[i]);
    }
  }
  return temp;
}

function printReceipt(inputs) {
  var newInputs = delRepeater(inputs);
  var list = '***<没钱赚商店>收据***\n';
  var total = 0;
  for(var i = 0; i < newInputs.length; i++){
    list = list + '名称：'+ newInputs[i].name
      +'，数量：'+ count(inputs,newInputs[i]) + newInputs[i].unit
      +'，单价：'+ newInputs[i].price.toFixed(2)
      +'(元)，小计：'+ (count(inputs,newInputs[i]) * newInputs[i].price).toFixed(2)
      +'(元)\n';
    total = total + count(inputs,newInputs[i]) * newInputs[i].price;
  }
  list = list + '----------------------\n' +
    '总计：'+ total.toFixed(2) +'(元)\n' +
    '**********************';
  console.log(list);
}
