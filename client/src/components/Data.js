import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Balance from './Balance';
import AddItem from "./AddItem";

export default function Data() {
  const [data, setData] = useState([]);

  // Get data from database
  useEffect(function (){
      axios.get('http://localhost:5001/api/transactions')
      .then(res => {setData(res.data)
      // console.log(res.data)
    })
      .catch(error => console.log(error)); 
    
  },[data]);         

  return (
    <div className='m-4'>
       <Balance data={data}/>
       <AddItem/>
        <Table database={data}/> 
     </div>
  )
}