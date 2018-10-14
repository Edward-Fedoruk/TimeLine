import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import MyLocation from '@material-ui/icons/MyLocation'

import { withStyles, Paper } from '@material-ui/core'

import Notes from './Components/Notes'
import TimeLine from './Components/TimeLine/TimeLine'

const styles = ({ zIndex, palette}) => {
  console.log()
  return {
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  appBar: {
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: zIndex.drawer + 1
  },

  drawer: {
    height: 'calc(100vh - 48px)',
    position: 'absolute',
    bottom: '0',
    top: 'unset',
    width: '229px',
    paddingTop: '36px',
    backgroundColor: palette.secondary.main,
    opacity: '.97'
  }

}}

class App extends React.Component {
  state = {
    appDrawer: false,
  }

  toggleAppMenu = () => this.setState({appDrawer: !this.state.appDrawer})

  render() {
    const { classes } = this.props
    const { appDrawer } = this.state
    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolBar} variant="regular">

            <IconButton onClick={this.toggleAppMenu} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit">
              TimeLine
            </Typography>

          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawer,
          }}
          open={appDrawer}
        >
          <List component="nav">

            <ListItem button>
              <ListItemIcon>
                <MyLocation />
              </ListItemIcon>
              <ListItemText inset primary="TimeLine" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Drafts" />
            </ListItem>
            
          </List>
        </Drawer>

        <TimeLine />
      
      </React.Fragment>
    )
  }
} 

export default withStyles(styles)(App)