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

const styles = (theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000'
  },
})

class TopMenu extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="static">

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

          <Tabs centered fullWidth value="one">
            <Tab value="one" label="Something" />
            <Tab value="two" label="Line" />
          </Tabs>

        </AppBar>
         
      </React.Fragment>
    )
  }
} 

export default withStyles(styles)(TopMenu)