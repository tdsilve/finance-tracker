import React from 'react'
import '../index.css';



export default function Balance({data}) {

  const bankBalance = getBalance(data, 'income');
  let expenses = getBalance(data, 'expense') * -1;

  let remain = bankBalance + expenses;

  return (
    <div className='d-flex flex-wrap m-3 text-center balances-bg-color text-white'>
        <BalanceDisplay title={'Income'} value={bankBalance}/>
        <BalanceDisplay title={'Expenses'} value={expenses}/>
        <BalanceDisplay title={'Remain'} value={remain}/>
    </div>
  )
}

function BalanceDisplay(props){
  return (
    <div className='card-body m-1'>
      <h2 className='card-title'>{props.title}:</h2>
      <span className='card-text'>${props.value}</span>
    </div>
  )
}


function getBalance(data, result){
  let aux = 0
  for(let key in data){
    if (data[key].type === result)
    {
      aux+= data[key].value
    }
  }
  return aux;
}