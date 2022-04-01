import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';

export default function Data() {
  const [data, setData] = useState([]);
  const [queryDescription, setQueryDescription] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [queryCategory, setQueryCategory] = useState('');

  // Get data from database
  useEffect(function (){
    if (queryValue.length <= 0)
    {
      axios.get('http://localhost:5001/api/transactions')
      .then(res => {setData(res.data)
      console.log(res.data)})
      .catch(error => console.log(error)); 
    }
    
  },[data]);  


  function handleSubmit(e){
    e.preventDefault();
    const userInput = {queryValue, queryDescription};
    fetch('http://localhost:5001/api/transactions/filter',
    {
      method: 'POST',
      headers: {'Content-type': "application/json"},
      body: JSON.stringify(userInput)
    })
    .then(res => {setData(userInput)
    console.log(res.data)})
    .catch(error => console.log(error)); 

  }

  return (
    <div>
      <div>
        <h3 className='m-3'>Filter:</h3>
        <form onSubmit={handleSubmit}>
          <label className='mb-2'>Description:</label>
          <input type="text" value={queryDescription} onChange={(e) => setQueryDescription(e.target.value)}  className='form-control mb-2'/>
          <label className='mb-2'>Value:</label>
          <input type="number" value={queryValue} onChange={(e) => setQueryValue(+e.target.value)}  className='form-control'/>
          <label className='m-2'>Category:</label>
          <select className='form-select' value={queryCategory} onChange={(e) => setQueryCategory(e.target.value)}>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="house">House</option>
            <option value="other">Other</option>
          </select>
          <div className='text-center'>
            <button className="btn btn-primary m-2 text-center">Search</button>
          </div>
          
        </form>
       

      <Table database={data}/>
     </div>
    </div>
    
  )
}
