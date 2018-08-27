import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const root = document.getElementById('root')

const render = () => {
  return ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
      </Switch>
    </BrowserRouter>,
    root
  )
}

render()

registerServiceWorker()


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp)
  });
}