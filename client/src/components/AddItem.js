import React, {useState} from 'react';

export default function AddItem() {
  const defaultValues = {
    empty: '',
    type: 'income',
    booleanDefault:false,
    category: 'salary'
  };

  const [value, setValue] = useState(defaultValues.empty);
  const [description, setDescription] = useState(defaultValues.empty);
  const [type, setType] = useState(defaultValues.type);
  const [category, setCategory] = useState(defaultValues.category);
  const [isPending, setIsPending] = useState(defaultValues.booleanDefault);
  
  const handleSubmit =  (e) =>{
    e.preventDefault();
    const userInput = {type, category, description, value};
    setIsPending(true);
    fetch('http://localhost:5001/api/transactions', {
     method: 'POST',
     headers: {'Content-type': "application/json"},
     body: JSON.stringify(userInput)
   }).then(res => {
     //Set values to default
     setValue(defaultValues.empty);
     setDescription(defaultValues.empty);
     setType(defaultValues.type);
     setCategory(defaultValues.category);
     setIsPending(defaultValues.booleanDefault);
   }).catch(error => console.log(error));
   
  };

  return (
      <form className='p-3 bg-grey' onSubmit = {handleSubmit}>
      <h2 className='text-center'>Add a Transaction</h2>
        <div className='form-group'>
          <label className='m-2'>Type of Transaction:</label>
          <select className='form-select' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className='mb-2 form-group'>
          <label className='m-2'>Category:</label>
          <select className='form-select' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="house">House</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='mb-2'>Description:</label>
          <input type='text' className='form-control' required value={description} onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        <div className='form-group'>
          <label className='m-2'>Value:</label>
          <input type='number'className='form-control' required value={value} onChange={(e) => setValue(e.target.value)}></input>
        </div>
        <div className='text-center'>
         {/* Disable the button if it is processing the request, and enable otherwise */}
        {!isPending && <button type="submit" className='btn btn-primary mt-3'>Add Transaction</button>}
        {isPending && <button type="submit" className='btn btn-primary mt-3' disabled>Adding...</button>}
        </div>
      </form>
  )
}