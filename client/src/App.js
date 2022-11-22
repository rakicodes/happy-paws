import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

import Header from './components/Header';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Feed />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
