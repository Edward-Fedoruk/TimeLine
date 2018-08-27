import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'


const root = document.getElementById('root')

const render = Component => {
  return ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    root
  )
}

render(App)

registerServiceWorker()


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}