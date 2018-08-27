import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import signUp from './Components/signUp'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

const root = document.getElementById('root')

const render = () => {
  return ReactDOM.render(
    <React.Fragment>

      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={signUp} />
          <Route path='/app' exact component={App} />
        </Switch>
      </BrowserRouter>
      
    </React.Fragment>,
    root
  )
}

render()

registerServiceWorker()


if (module.hot) {
  module.hot.accept('./Components/LogIn', () => {
    const NextApp = require('./Components/signUp').default;
    render(NextApp)
  });
}