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
// import VideoChat from "pages/VideoChat";
import RegistrationDetail from "pages/RegistrationDetail";
import HangUp from "pages/HangUp"
import React, { lazy, Suspense } from 'react';

const VideoChat = lazy(() => import('pages/VideoChat'));

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/change-account" element={<ChangeAccount/>} />
          <Route path="/registration-detail" element={<RegistrationDetail />} />
          <Route path="/hangup" element={<HangUp />} />\
          <Route path="/map" element={<Map />} />
          <Route path="/room/:roomName/:idx" element={<Suspense fallback={<div><h1>렌더링 중입니다!!!</h1></div>}><VideoChat /></Suspense>} />
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


    </Routes>
  );
}

export default App;
