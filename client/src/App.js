import { Route, Routes, Link } from "react-router-dom";
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
<<<<<<< HEAD


=======
>>>>>>> e5c3279f674882e70953f9d42a51816a4943c252

const Home = lazy(() => import('pages/Home'));
const VideoChat = lazy(() => import('pages/VideoChat'));

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: '', url: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  // 

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body.content, url: payload.data.url})
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
      <Toast onClose={() => setShow(false)} show={show} delay={400000} className="rounded me-2" autohide animation style={{
                position: 'absolute',
                top: '15%',
                right: '20%',
                minWidth: 200, 
              }}>
                <Toast.Header>
                  <strong className="mr-auto">{notification.title}</strong>
                </Toast.Header>
                <Toast.Body>{notification.body}</Toast.Body>
                <button><Link to={notification.url}>이동하기</Link></button>
      </Toast>
    </div>
  );
}

export default App;
