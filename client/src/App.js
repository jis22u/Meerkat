import { Route, Routes } from "react-router-dom";
import Register from "pages/Register";
import 'App.css';
import Layout from 'pages/Layout';
import AuthLayout from 'pages/AuthLayout';
import MyPage from 'pages/MyPage'
import Cash from 'pages/Cash'
import Map from 'pages/Map'
import Login from 'pages/Login';
import ChangeAccount from 'pages/ChangeAccount';
// import VideoChat from "pages/VideoChat";
// import Home from 'pages/Home';
import RegistrationDetail from "pages/RegistrationDetail";
import HangUp from "pages/HangUp"
import React, { lazy, Suspense } from 'react';
import BigSpinner from 'components/layout/BigSpinner'
import { onMessageListener } from './api/firebase';
import { Toast } from 'react-bootstrap';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = lazy(() => import('pages/Home'));
const VideoChat = lazy(() => import('pages/VideoChat'));

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  // 

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<BigSpinner/>}><Home /></Suspense>}/>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/change-account" element={<ChangeAccount/>} />
          <Route path="/registration-detail" element={<RegistrationDetail />} />
          <Route path="/hangup" element={<HangUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/room/:roomName/:idx" element={<Suspense fallback={<BigSpinner/>}><VideoChat /></Suspense>} />
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide animation style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                minWidth: 200
              }}>
                <Toast.Header>
                  <strong className="mr-auto">{notification.title}</strong>
                  <small>just now</small>
                  <button>가는 버튼</button>
                </Toast.Header>
                <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
    </div>
  );
}

export default App;
