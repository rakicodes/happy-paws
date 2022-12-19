import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Map from './pages/Map';

function App() {
  const [location, setLocation] = useState([])

  const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation([position.coords.longitude, position.coords.latitude])
        })
    }
  }

  useEffect(() => {
    getLocation();
  })

  return (
    <>
      <Router>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Feed location={location}/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile location={location}/>}/>
                <Route path="/map" element={<Map />}/>
            </Routes>
        </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
