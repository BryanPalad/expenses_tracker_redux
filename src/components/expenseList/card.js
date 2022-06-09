import React, {useState} from 'react'
import './card.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteExpense, updateExpense } from '../../redux/core/expenseSlice';
import {categories} from '../../constants/category';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    "@media (max-width: 1024px)": {
        width: 400,
        marginTop: "10px",
        height: 630,
      },
    "@media (max-width: 512px)": {
        width: 320,
        marginTop: "10px",
        height: 630,
    },
  };

const Card = ({ item, notifySuccess, notifyUpdated, notifyError }) => {
  const [open, setOpen] = React.useState(false);
  const [dialogOpenUpdate, setDialogOpenUpdate] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [itemAmount, setItemAmount] = useState(item.amount);

  const handleTitle = (e) => {
      if(e.target.value === ""){
          setTitle("");
      } else {
        setTitle(e.target.value);
      }
  }
  const handleItemAmount = (e) => {
      const val = parseFloat(e.target.value)
      if(isNaN(val)){
          setItemAmount('');
          return false;
      } else if (e.target.value.length > 6){
          return false;
      } else if (e.target.value === ""){
          setItemAmount("");
      } else {
        setItemAmount(e.target.value);
      }
  }
  const handleUpdateOpen = () => {
    setOpen(true);
  }
  const handleCloseModal = () => {
      if(title === ""){
          notifyError('Please provide an expense title');
          return false;
      } else if (itemAmount === ""){
          notifyError('Please enter an amount');
          return false;
      } else {
          setOpen(false);
      }
  }
    
  const handleCloseUpdate = () => {
        setDialogOpenUpdate(false);
  }
  const handleUpdateExpense = () => {
    if(title === ""){
        notifyError('Please provide an expense title');
        return false;
    } else if (itemAmount === ""){
        notifyError('Please enter an amount');
        return false;
    } else {
        setDialogOpenUpdate(true);
    }
    
  }
  const confirmUpdate = () => {
      const data = {
          title,
          itemAmount,
          category,
          createdAt: item.createdAt,
      }
    setDialogOpenUpdate(false);
    setOpen(false);
    dispatch(updateExpense(data))
    notifyUpdated();
    
  }
  // Expenses List 
  const cat = categories;
  const [category, setCategory] = useState(item.category);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const time = moment(item.createdAt).fromNow();
  const [dialogOpen, setDialogOpen] = useState(false);

  const date = new Date(item.createdAt);
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  const dateExpense = (date.toLocaleDateString(undefined, options));
  const dispatch = useDispatch();
  const handleDelete = () => {
      setDialogOpen(true);
  }
  const handleClose = () => {
      setDialogOpen(false);
  }
  const handleCategory = (category) => {
      setCategory(category);
      setCategoryOpen(false);
  }
  const confirmDelete = () => {
      dispatch(deleteExpense(item));
      notifySuccess();
      setDialogOpen(false);
  }
  return (
    <div className='card' style={{borderRight: `6px solid ${item.category.color}`}}>
        {/* UPDATE MODAL */}
        <Dialog
            open={dialogOpenUpdate}
            onClose={handleCloseUpdate}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            Update Item
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to update <b>{item.title}</b>?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseUpdate}>Cancel</Button>
            <Button onClick={confirmUpdate} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
         <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <div className='modal-main-title'>
          <label>Update Expense Info</label>
          <i class="fi fi-rr-edit"></i>
          </div>
          <hr/>
            <div className="modal-update">
            <div className="modal-icon">
             <img src={item.category.icon} alt={item.category.title} className="card-image"/>
            </div>
            <div className="modal-title">
            <label>{item.title}</label>
            </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-item">
                <div className="modal-label">
                <label>Title:</label>
                <input placeholder='Provide expense title' value={title} onChange={(e) => handleTitle(e)}/>
                </div>
                <div className="modal-amount">
                <label>Amount: ₱</label>
                <input placeholder='Enter an Amount' value={itemAmount} onChange={() => handleItemAmount()}/>
                </div>
                <div className="category-container-parent">
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
            </div>
            <div className="modal-button">
                            <div className="cancel-btn" onClick={handleCloseModal}>
                            <label>Cancel</label>
                        </div>
                            <div className="update-btn" onClick={(e) => handleUpdateExpense(e)}>
                            <label>Update</label>
                        </div>
                    </div>
                    
          </Typography>
        </Box>
        {/* END OF UPDATE MODAL */}
        </Modal>
         <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            Remove Expenses
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove <b>{item.title}</b> to your expense list?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={confirmDelete} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        <div className='card-image-container' onClick={(e) => handleUpdateOpen(e)}>
            <img src={item.category.icon} alt={item.category.title} className="card-image"/>
        </div>
        <div className='card-info' onClick={(e) => handleUpdateOpen(e)}>
            <label className='card-title'>{item.title}</label>
            <label className='card-time' id="timelabel">{time === '2 days ago' ? dateExpense : time}</label>
        </div>
        <div className='card-right'>
            <div>
                <label className="card-amount">₱{item.amount}</label>  
            </div>
            <div className='delete-icon' onClick={handleDelete}>
                <i class="fi fi-rr-trash"></i>
            </div>
        </div>
    </div>
  )
}

export default Card