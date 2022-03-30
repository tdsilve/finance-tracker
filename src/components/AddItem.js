import React from 'react'

export default function AddItem() {
  function handleSubmit(e){
    e.preventDefault();
  }

  return (
      
      <form className='p-3 ' onSubmit = {handleSubmit}>
      <h2 className='text-center mt-2'>Add a Transaction</h2>
        <div className='form-group'>
          <label className='mb-2'>Type of Transaction:</label>
          <select className='form-select'>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className='mt-3 form-group'>
          <label className='mb-2'>Category:</label>
          <select className='form-select'>
            <option value="income">Salary</option>
            <option value="expense">Food</option>
            <option value="expense">Transport</option>
            <option value="expense">House</option>
            <option value="expense">Other</option>
          </select>
        </div>
        <div className='mt-3 form-group'>
          <label className='mb-2'>Description:</label>
          <input type='text' className='form-control' required></input>
        </div>
        <div className='mt-3 form-group'>
          <label className='mb-2'>Value:</label>
          <input type='number'className='form-control' required></input>
        </div>
        <div className='text-center'>
          <input type="submit" value="Save" className='btn btn-primary mt-3'/>
        </div>
        
      </form>
  )
}
