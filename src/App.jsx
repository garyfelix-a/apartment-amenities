import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Ratings from './components/Ratings';
import { Reviews } from './components/client-side/Reviews';

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path='' element={<Form />} />
            <Route path='/ratings' element={<Ratings />} />
            <Route path='/reviews' element={<Reviews />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
