import './App.css';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './layout/Navbar'


function App() {
  return (
    <Router>
      <main className="App">
      <Navbar />
        <div className="content">
          
          <Switch>
            <Route path="/">
            

            </Route>
          </Switch>
        </div>
      </main>
    </Router>
    
  );
}

export default App;
