import React from "react"
import { withStyles } from "@material-ui/core"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = ({ zIndex }) => ({
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
  }
})

class TopBar extends React.PureComponent {
  modes = ["Day", "Month", "Year", "Years"]
  
  render() {
    const { toggleAppMenu, classes, currentModeIndex } = this.props
    return (
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolBar} variant="regular">

          <IconButton onClick={toggleAppMenu} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="title" 
            color="inherit"
          >
            TimeLine ({this.modes[currentModeIndex]})
          </Typography>

        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopBar)
