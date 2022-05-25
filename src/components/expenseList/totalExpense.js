import React from 'react'
import './card.css';

const TotalExpense = ({total}) => {
  return (
    <div className='total'>
        <div className="total-expense">
            <div className="expense-title">
            Total Expenses:
            </div>
            <div className="expense-value">
            ₱{total}
            </div>
        </div>
    </div>
  )
}

export default TotalExpense