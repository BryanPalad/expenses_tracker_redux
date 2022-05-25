import React, { useState } from 'react'
import './addForm.css';
import { categories } from '../../constants/category';
import {addExpense} from '../../redux/core/expenseSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddForm = () => {
  const cat = categories;
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [title,setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();    

  const handleClose = () => {
    setDialogOpen(false);
  };

const handleConfirm = () => {
    setDialogOpen(false);
        const data = {
            title,
            amount,
            category,
            createdAt: new Date()
        }
        successNotif("Successfully Added Expense");
        dispatch(addExpense(data))
        setTitle("");
        setAmount("");
        setCategory("");
    } 

const handleTitle = (e) => {
    setTitle(e.target.value);
}
const handleAmount = (e) => {
    const val = parseFloat(e.target.value);
    if(isNaN(val)){
        setAmount('');
        return false
    }
    setAmount(val);
}
const handleCategory = (category) => {
    setCategory(category);
    setCategoryOpen(false);
}

const errorNotif = (notif) => {
    toast.error(notif);
}

const successNotif = (notif) => {
    toast.success(notif);
}

const handleSubmit = () => {
    if(title ===  "" && amount === "" && !category){
        errorNotif("Empty Fields, Please try again!")
        return false;
    } else if (title === "") {
        errorNotif("Please provide an expense title!");
        return false;
    } else if (amount === "") {
        errorNotif("Please enter an amount!");
        return false;
    } else if (!category) {
        errorNotif("Please select a category!");
        return false;
    } else {
        setDialogOpen(true);
    }
}
  return (
    <div className='add-form'>
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <Dialog
    open={dialogOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      Expenses Confirmation
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to add <b>{title}</b> to your expense list?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleConfirm} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
    <div className="addexpense-title">
    <h2>Add Expense</h2>
    <i class="fi fi-rr-notebook"></i>
    </div>
    <div className='form-item'>
        <label>Title</label>
        <input placeholder='Give a name to your expenditure' value={title} onChange={(e) => handleTitle(e)}/>
    </div>
    <div className='form-item'>
        <label>Amount ₱</label>
        <input className="amount-input" placeholder='Enter amount' value={amount} onChange={(e) => handleAmount(e)}/>
    </div>
    <div className='category-container-parent'>
        <div className='category'>
            <div className="category-dropdown" onClick={() => setCategoryOpen(!categoryOpen)}>
                <label>{category ? category.title : 'Select Category'}</label>
                <i class="fi fi-rr-angle-down"></i> 
            </div>
            {categoryOpen && (
            <div className='category-container'>
                {cat.map((category) => (
                    <div className="category-item" style={{borderRight: `5px solid ${category.color}`}} key={category.id}
                    onClick={() => handleCategory(category)}>
                        <label>{category.title}</label>
                        <img src={category.icon} alt={category.title}/>
                    </div>
                ))}
            </div>
                
            )}
        </div>
    </div>
    
    <div className="form-add-button">
        <div onClick={handleSubmit}>
            <label>Add to list</label>
            <i class="fi fi-rr-paper-plane"></i>
        </div>
    </div>
</div>
  )
}

export default AddForm