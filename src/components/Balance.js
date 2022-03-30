import React from 'react'
import '../index.css';

export default function Balance() {

  const bankBalance = 1000;
  let expenses = 100;
  let remain = bankBalance - expenses;

  return (
    <div className='d-flex flex-wrap m-3 text-center balances-bg-color text-white'>
        <BalanceDisplay title={'Income'} value={bankBalance}/>
        <BalanceDisplay title={'Expenses'} value={expenses}></BalanceDisplay>
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


