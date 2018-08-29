import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import LogIn from './Components/Authentication/LogIn'
import signUp from './Components/Authentication/signUp'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#03a87c',
    },
  },
})

const root = document.getElementById('root')

const render = () => {
  return ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={signUp} />
          <Route path='/app' exact component={App} />
          <Route path='/login' exact component={LogIn} />
        </Switch>
      </BrowserRouter>
      
    </MuiThemeProvider>,
    root
  )
}

render()

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./Components/signUp', () => {
    const NextApp = require('./Components/Authentication/signUp').default;
    render(NextApp)
  })

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp)
  })
}