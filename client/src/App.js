import Data from './components/Data';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Filter from './components/Filter';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Router>
      <Navbar/>
      <h1 className='text-center'>My Personal Finance Tracker</h1>
     <Routes>
      <Route path="/" element={<Data/>}/>
      <Route path="/filter" element={<Filter/>}/>
     </Routes>
   </Router>
    </div>
  );
}

export default App;
