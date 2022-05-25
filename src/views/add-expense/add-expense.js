import React from 'react'
import AddForm from '../../components/addForm/addForm';
import Topfold from '../../components/topfold/topfold';
import './add-expense.css';

const AddExpense = () => {
  return (
    <div className='add-expense'>
      <Topfold/>
      <AddForm/>
    </div>
  )
}

export default AddExpense