import axios from 'axios';
import React, {useState} from 'react';
import Table from './Table';

const path = "http://localhost:5001/api/transactions?";

export default function Filter() {
  const [queryDescription, setQueryDescription] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [queryCategory, setQueryCategory] = useState('');
  const [data, setData] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    let endpoint = path; 

    if (queryValue){
      endpoint += `value=${queryValue}`;
    }
    if (queryCategory){
      endpoint += `&category=${queryCategory}`;
    }
    if (queryDescription){
      endpoint += `&description=${queryDescription}`;
    }
    axios.get(endpoint).then(res => {setData(res.data)})
      .catch(error => console.log(error)); 

  }
  return (
    <div className='m-4'>
    <div className='bg-grey p-3'>
    <h3 className='m-3'>Filter:</h3>
    <form onSubmit={handleSubmit} >
      <label className='mb-2'>Description:</label>
      <input type="text" value={queryDescription} onChange={(e) => setQueryDescription(e.target.value)}  className='form-control mb-2'/>
      <label className='mb-2'>Value:</label>
      <input type="number" value={queryValue} onChange={(e) => setQueryValue(e.target.value)}  className='form-control'/>
      <label className='m-2'>Category:</label>
      <select className='form-select' value={queryCategory} onChange={(e) => setQueryCategory(e.target.value)}>
        <option value="">Category</option>
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
  </div>
    <Table database={data}/>
</div>
  )
}
