import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute  from './components/ProtectedRoute'
import './App.css';

const  App = () => (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route element = {<ProtectedRoute/>}>
          <Route exact path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

export default App;
