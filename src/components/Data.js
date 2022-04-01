import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Filter from './Filter';

export default function Data() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

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
        <h6>Filter</h6>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
      </div>
     {/* <Table data={data}/> */}
     <div>
      <Table database={data}/>
     </div>
    </div>
    
  )
}
