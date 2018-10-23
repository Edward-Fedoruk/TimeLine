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
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#663A92',
    },
    secondary: {
      main: '#FAFAFA',
    },
  },

  timeLineSpaces: {
    taskOffset: 50,
    taskSize: 23,
    taskWithSpace: 73
  },

  typography: {
    useNextVariants: true,
  },

  overrides: {
    MuiInput: {
      underline: {
        '&:before': { //underline color when textfield is inactive
          borderBottomColor: '#AF5DD3',
        },
        '&:hover:not($disabled):before': { //underline color when hovered 
          borderBottomColor: '#AF5DD3',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #572D8B !important`,
        },
      }
    }
  }
})

const root = document.getElementById('root')

const render = () => {
  return ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />

        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path='/' exact component={signUp} />
            <Route path='/app' exact component={App} />
            <Route path='/login' exact component={LogIn} />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>,
    root
  )
}

render()

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./Components/Authentication/signUp', () => {
    const NextApp = require('./Components/Authentication/signUp').default;
    render(NextApp)
  })

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp)
  })
}