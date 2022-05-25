import React from 'react'
import './home.css';
import Topfold from '../../components/topfold/topfold';
import ExpenseList from '../../components/expenseList/expenseList';

const Home = () => {
  return (
    <div className='home'>
      <Topfold/>
      <ExpenseList/>
    </div>
  )
}

export default Home