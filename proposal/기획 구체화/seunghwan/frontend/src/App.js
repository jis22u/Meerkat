import {Route, Routes} from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import MyPage from './pages/MyPage'
import Layout from './pages/Footer'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
