
const currencyUnit = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
  }
  
  
  function checkCashRegister(price, cash, cid) {
  
    let changeSum = cash * 100 - price * 100;
    let changeSumCheck = changeSum;
    let change = [];
    let status = '';
  
    let cidSum = 0;
    let filteredCid = cid.filter(elem => elem[1] !== 0).reverse();
  
    filteredCid.forEach(elem => {
      let curr = elem[0];
      let currSum = elem[1] * 100;
      cidSum += currSum;
      let amount = 0;
      while (changeSum >= currencyUnit[curr] && currSum > 0) {
        amount += currencyUnit[curr];
        changeSum -= currencyUnit[curr];
        currSum -= currencyUnit[curr];
      }
      if (amount !== 0) {
        change.push([curr, amount / 100]);
      }
    });
  
    if (changeSum > 0) {
      status = 'INSUFFICIENT_FUNDS';
      change = [];
    } else if (changeSum == 0 && changeSumCheck == cidSum) {
      status = 'CLOSED';
      change = cid;
    } else {
      status = 'OPEN';
    }
    return { 'status': status, 'change': change };
  }

  /*
  Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]

---------------REQUIREMENTS-----------------
Tests
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
Passed:checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

  */






//-------------------------OTHER WAY:----------------------


// function checkCashRegister(price, cash, cid) {
//   let change = cash*100 - price*100;
//   let cidtotal = 0;
//   for(let i in cid){
//     cidtotal += i[1]*100;
//   }

//   if(change>cidtotal){
//     return {status: "INSUFFICIENT FUNDS", change:[]}
//     }else if(change ===cidtotal){
//       return {status: "CLOSED", change:cid}
//     }
//     else{
//       let answer = [];
//       cid = cid.reverse();
//       let moneyunits = {"ONE HUNDRED": 10000, "TWENTY": 2000, "TEN": 1000, "FIVE": 500, "ONE": 100, "QUARTER": 25, "DIME": 10, "NICKEL": 5, "PENNY": 1}
//       for(let i of cid){
//         let holder = [i[0], 0];
//         i[1]=i[1]*100;
//         while(change>=moneyunits[i[0]] && i[1]>0){
//           change -= moneyunits[i[0]];
//           i[1] -= moneyunits[i[0]];
//           holder[1] += moneyunits[i[0]]/100;
//         }
//         if(holder[1]>0){
//           answer.push(holder)
//         }
//       }
//       if(change>0){
//         return {status: "INSUFFICIENT_FUNDS", change:[]}
//       }
//       return {status: "OPEN", change: answer}
//     }
// }

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);