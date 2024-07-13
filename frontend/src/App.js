import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
import PrivateRoute from './components/Utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import Signup from "./components/Register/Signup";
import CareerCompass from "./components/About/CareerCompass";
import TableContainer from "./components/TableContainer/TableContainer";
import ArchivedTableContainer from "./components/TableContainer/ArchivedTableContainer";
import EditJobApplication from "./components/JobApplication/EditJobApplication";
import AddTags from "./components/Tags/AddTags";
import AddJobApplication from "./components/JobApplication/AddJobApplication";
import ViewJobApplication from "./components/JobApplication/ViewJobApplication";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

function App() {
  const [signupKey, setSignupKey] = useState(0);
  const handleSignupClick = () => {
    setSignupKey((prevKey) => prevKey + 1);
  };

  return (
      <AuthProvider>
        <Router>
          <Navbar onSignupClick={handleSignupClick} />
          <Routes>
            <Route path='/' element={<CareerCompass />} />
            <Route path='/archivedJobs' element={<PrivateRoute><ArchivedTableContainer /></PrivateRoute>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup key={signupKey} />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/jobs' element={<PrivateRoute><TableContainer /></PrivateRoute>} />
            <Route path="/details"  element={<PrivateRoute><ViewJobApplication /></PrivateRoute>} />
            <Route path="/edit"  element={<PrivateRoute><EditJobApplication /></PrivateRoute>} />
            <Route path="/addTags"  element={<PrivateRoute><AddTags /></PrivateRoute>} />
            <Route path="/addJobApplication"  element={<PrivateRoute><AddJobApplication /></PrivateRoute>} />
            <Route path='/verify/:email/:hash' element={<ResetPassword />} />
            {/*<Route path='/forgot/:email/:hash' element={<Verify />} />*/}
            {/*<Route path="*" element={<Navigate to="/login" />} />*/}
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;