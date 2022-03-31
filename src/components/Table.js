import React from 'react';
import Search from './Search';

export default function Table() {
  return (
    <div className='d-flex align-items-center flex-column mt-3'>
      <h2 className='mb-3'>Transactions</h2>
      <Search/>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
    </div>
  )
}
