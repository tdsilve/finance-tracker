import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';

export default function Data() {
  const [data, setData] = useState([]);
  const [queryDescription, setQueryDescription] = useState('');
  const [queryValue, setQueryValue] = useState('');

  // Get data from database
  useEffect(function (){
      axios.get('http://localhost:5001/api/transactions')
      .then(res => {setData(res.data)
      console.log(res.data)})
      .catch(error => console.log(error)); 
    
  },[data]);  

  return (
    <div>
      <div>
        <h3 className='m-3'>Filter:</h3>
        <form>
          <label className='mb-2'>Description:</label>
          <input type="text" value={queryDescription} onChange={(e) => setQueryDescription(e.target.value)}  className='form-control mb-2'/>
          <label className='mb-2'>Value:</label>
          <input type="number" value={queryValue} onChange={(e) => setQueryValue(e.target.value)}  className='form-control'/>
        </form>
       

        {/* <button onSubmit={handleSubmit}>Search</button> */}
      <Table database={data}/>
     </div>
    </div>
    
  )
}
