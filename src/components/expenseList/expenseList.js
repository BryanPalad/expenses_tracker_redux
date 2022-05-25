import React from 'react'
import './expenseList.css';
import Card from './card';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import TotalExpense from './totalExpense';
import { Link } from 'react-router-dom';
const ExpenseList = () => {
    const {expenseList: list, query} = useSelector(state=>state.expense);
    const filteredList = list.filter(item=>item.title.includes(query));
    const notifySuccess = () => toast.success('Expenses Removed');
    const notifyUpdated = () => toast.success('Expense Updated');
    const notifyError = (notif) => toast.error(notif)
    const inOrderList = filteredList.reverse();
    const sum = filteredList.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

  return (
    <div className='expense-list'>
        <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        />
        {inOrderList.length ? inOrderList.map((item) =>(
            <>
            <Card item={item} notifySuccess={notifySuccess} notifyUpdated={notifyUpdated} notifyError={notifyError}/>
            </>
            ))  : <div className='empty-state'>
              <Link to="/add-expense">
            <img src={require('../../assets/images/noexpense.png')} alt="empty list" className="empty-image"/>
            </Link>
            <label> Uh Oh! Your expense list is empty</label>
            </div>}

        {inOrderList.length ? (
          <TotalExpense total ={sum}/>
        ): (<></>)}
            
    </div>
  )
}

export default ExpenseList