import React from 'react';

export default function Table({database}) {

  const columns = filterKeys(database[0]);

  return (
    <div className='d-flex align-items-center flex-column mt-3'>
      <table className='table table-striped text-center'>
        <thead className='bg-primary text-white'>
          <TableHead database={database} columns={columns}/>
        </thead>
          <TableBody database={database} columns={columns}/>

      </table>
      
    </div>
  )
}

function TableHead({columns, database}){
  //Return table's head
  return(
        <tr>
            {columns.map((column, index) => <th key={index}>{column}</th>)}
          </tr> 
  )
}

function TableBody({columns, database}){
  //Return table's body
  
  const contents = [];

  for (let key in database){
    let content = []
    columns.map((column) => content.push(database[key][column]));
    //Display a positive expense
    if (database[key]['type'] === 'expense' && database[key]['value'] > 0){
      database[key]['value'] *= -1;
    }
    contents.push(content);
  }

  return (
    <tbody className='table-hover text-black'>
      {contents.map((row, index) => <tr key={index}>{row.map((data) => <td>{data}</td>)}</tr>)}
    </tbody>
  )
}

function filterKeys(data){
  //Receives an object and return an array of keys. The first letter must be a character. 

  const arrayOfKeys = [];
  for (let key in data){
    if (isFirstCharracterALetter(key)){
      arrayOfKeys.push(key);
    }
  }
  return arrayOfKeys;
}

function isFirstCharracterALetter(value){
  //Return true if the first character of value is a character, false otherwise
  return (/[a-zA-Z]/).test(value[0]);
}



