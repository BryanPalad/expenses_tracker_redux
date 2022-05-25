import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/home/home';
import AddExpense from './views/add-expense/add-expense';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-expense" element={<AddExpense/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
