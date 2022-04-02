import React from 'react';

export default function Table({database}) {
 const columns = setColumns(database[0]);

  if(isTableEmpty(database)){
    return <p className='text-center mt-4 bg-danger p-3 text-white'>NO DATA!</p>
  }
 
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
    //Display expenses as negative numbers
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

function setColumns(data){
  /*  Get the name of the columns from data, but some names do not start with a letter. This function returns a list that contains the name of the columns, all names must start with a letter. */
  const columnsName = [];
  
  for (let key in data){
    if (isAllLetters(key))
    {
      columnsName.push(key);
    }
   
  }
  return columnsName;
}

function isTableEmpty(database){
  //Return true if there is no data, false otherwise
  return !database.length;
}

function isAllLetters(value){
  /*Receives a string and return true if it contains only letter and false otherwise*/
  return /^[a-zA-Z]+$/.test(value);
}