import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Balance from './Balance';
import AddItem from "./AddItem";
import Filter from './Filter';

export default function Data() {
  const [data, setData] = useState([]);
 

  // Get data from database
  useEffect(function (){
      axios.get('http://localhost:5001/api/transactions')
      .then(res => {setData(res.data)
      console.log(res.data)})
      .catch(error => console.log(error)); 
    
  },[data]);         

  return (
    <div>
       <Balance data={data}/>
       <AddItem/>
       <Filter/>
        <Table database={data}/> 
  
     </div>

    
  )
}

function toArrayOfObjects(data){
  let arr = [];
  for (let keys in data){
    arr.push(data[keys]);
  }
  return arr;
}

