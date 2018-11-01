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
import Timeline from '@material-ui/icons/Timeline'
import { Transition } from 'react-transition-group'

import { withStyles } from '@material-ui/core'

import TimeModePicker from './Components/TimeModePicker'
import TimeLine from './Components/TimeLine/TimeLine'

const styles = ({ zIndex, palette}) => {
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

  drawerPaper: {
    height: 'calc(100vh - 48px)',
    position: 'absolute',
    bottom: '0',
    top: 'unset',
    width: '229px',
    paddingTop: '36px',
    backgroundColor: palette.secondary.main,
    opacity: '.97'
  },

  drawer: { zIndex: '1' }

}}

class App extends React.Component {
  state = {
    appDrawer: false,
    modeList: false,
    mode: 0
  }

  switchMode = mode => () => this.setState({ mode })

  toggleAppMenu = () => this.setState({ appDrawer: !this.state.appDrawer })

  expandTimeList = () => this.setState({ modeList: !this.state.modeList })

  render() {
    const { classes } = this.props
    const { appDrawer, modeList, mode } = this.state
    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolBar} variant="regular">

            <IconButton onClick={this.toggleAppMenu} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography 
              variant="title" 
              color="inherit"
            >
              TimeLine
            </Typography>

          </Toolbar>
        </AppBar>

          
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawer}
          open={appDrawer}
          onClose={this.toggleAppMenu}
          ModalProps={{ BackdropProps: { invisible: true } }}
        >
          <List component="nav">

            <ListItem             
              onClick={this.expandTimeList} style={{position: 'relative'}} button>
            
              <ListItemIcon>
                <Timeline />
              </ListItemIcon>

              <ListItemText inset primary="TimeLine" />

            </ListItem>

            <TimeModePicker 
              modeList={modeList} 
              switchMode={this.switchMode}
            />

          </List>
        </Drawer>

        <TimeLine mode={mode} />
      
      </React.Fragment>
    )
  }
} 

export default withStyles(styles)(App)