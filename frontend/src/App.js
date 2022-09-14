import './App.css';
import Homepage from './components/Homepage'

function App() {
   // set state for if user clicks bin, state will be an empty
   // string initially, and then when a user clicks the
   // bin, set the state to the bin id. This should cause a rerender
   // which will allow us to display either the homepage, or the
   // bin page

  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
