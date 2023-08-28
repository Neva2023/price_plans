export default function totalPhoneBill(theString, sms_price, call_price){
    var totalCost = 0;
    var theList=theString.split(', ');
    for(var i=0;i<theList.length;i++){
      if(theList[i]===('call')){
        totalCost = totalCost + call_price;}
      else if(theList[i]===('sms')){
        totalCost=totalCost+ sms_price;}
    }
    return 'R'+ totalCost.toFixed(2);
  }
                                