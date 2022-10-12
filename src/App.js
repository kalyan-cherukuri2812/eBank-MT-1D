import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import NotFound from './Components/Notfound'
// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
