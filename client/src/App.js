import { Route, Routes } from "react-router-dom";
import Register from "pages/Register";

import 'App.css';
import Layout from 'pages/Layout';
import AuthLayout from 'pages/AuthLayout';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage'
import Cash from 'pages/Cash'
import Map from 'pages/Map'
import Login from 'pages/Login';
import ChangeAccount from 'pages/ChangeAccount';
// import Protected from 'pages/Protected';
import VideoChat from "pages/VideoChat";
import RegistrationDetail from "pages/RegistrationDetail";


function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/cash" element={<Cash />} />
            <Route path="/change-account" element={<ChangeAccount/>} />
            <Route path="/registration-detail" element={<RegistrationDetail />} />
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      <Route path="/map" element={<Map />} />
      <Route path="/room/:roomName" element={<VideoChat />} />
    </Routes>
  );
}

export default App;
