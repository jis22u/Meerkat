import { Route, Routes, Link } from "react-router-dom";
import Register from "pages/Register";
import 'App.css';
import Layout from 'pages/Layout';
import AuthLayout from 'pages/AuthLayout';
import MyPage from 'pages/MyPage'
import Cash from 'pages/Cash'
import Map from 'pages/Map'
import Login from 'pages/Login';
import VideoLayout from 'pages/VideoLayout';
import ChangeAccount from 'pages/ChangeAccount';
import RegistrationDetail from "pages/RegistrationDetail";
import HangUp from "pages/HangUp"
import React, { lazy, Suspense } from 'react';
import BigSpinner from 'components/layout/BigSpinner'
import { onMessageListener } from './api/firebase';
import { Toast } from 'react-bootstrap';
import { useState } from 'react'


const Home = lazy(() => import('pages/Home'));
const VideoChat = lazy(() => import('pages/VideoChat'));

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: '', url: ''});
  // 

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body, url: payload.data.url})
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
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<VideoLayout />}>
          <Route path="/room/:roomName/:idx" element={<Suspense fallback={<BigSpinner/>}><VideoChat /></Suspense>} />
        </Route>
      </Routes>
      <Toast onClose={() => setShow(false)} show={show} delay={400000} autohide animation style={{
                position: 'absolute',
                top: '10%',
                right: '6%',
              }}>
                <Toast.Header
                style = {{
                  marginTop: '10px',
                  color: '#6c757d',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderColor: 'rgba(0, 0, 0, 0.05)'}}
                >
                  <strong className="mr-auto">{notification.title}</strong>
                </Toast.Header>
                {notification.body && <Toast.Body style = {{minHeight : '50px', color: '#6c757d'}}>요청내용 : {notification.body}</Toast.Body>}
                <Link to={notification.url}>이동하기</Link>
      </Toast>
    </div>
  );
}

export default App;
