import SignUpOne from './components/Signupform'
import Loginform from './components/Loginform'
import './App.css';
import Showdb from './components/Showdb';
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
<>
<Routes>
  <Route path='/' element={<SignUpOne/>}/>
  <Route path='/login' element={<Loginform/>}/>
  <Route path='/users' element={<Showdb/>}/>


</Routes>
</>
  );
}

export default App;
