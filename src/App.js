import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVert from '@material-ui/icons/MoreVert'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core'

import Notes from './Components/Notes'
import TimeLine from './Components/TimeLine'

const styles = (theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000',
  },
})

class App extends React.Component {
  state = {
    value: 0,
  }

  tabChange = (e, value) => this.setState({ value })

  render() {
    const { classes } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        {/* <AppBar position="fixed">

          <Toolbar className={classes.toolBar} variant="dense">

            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit">
              TimeLine
            </Typography>

            <IconButton color="inherit" aria-label="Menu">
              <MoreVert />
            </IconButton>

          </Toolbar>

          <Tabs onChange={this.tabChange} centered fullWidth value={value}>
            <Tab value={0} label="Notes" />
            <Tab value={1} label="Line" />
          </Tabs>

        </AppBar> */}

        {/* {value 
          ? <FullLine />
          : <Notes />} */}
        <TimeLine />
      
      </React.Fragment>
    )
  }
} 

export default withStyles(styles)(App)