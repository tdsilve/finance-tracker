import AddItem from "./components/AddItem";
import Balance from "./components/Balance";
import Data from './components/Data';


function App() {
  return (
  <div className="container p-3 justify-content-center">
      <h1 className='text-center'>My Finance Planner</h1>
        <Balance/>
        <AddItem/>
        <Data/> 
    </div>
  
  );
}

export default App;
