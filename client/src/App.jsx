import './App.css';
import Register from './screens/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/> } />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
