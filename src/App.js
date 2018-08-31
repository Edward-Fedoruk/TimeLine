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
import Line from './Components/Line'

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
    lineHeight: 101,
    tasksPos: []
  }

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY === 0) {
      console.log(this.state.lineHeight)
      this.setState({ lineHeight: this.state.lineHeight + 100 })
      window.scrollBy(0, windowHeight)
    }
  }

  makeTask = e => {
    // const id = parseInt(e.target.dataset.id)
    const taskPos = e.nativeEvent.offsetY

    // console.log(e.target.offsetTop, e.nativeEvent.offsetY)
    // console.log(e.target.offsetTop + e.nativeEvent.offsetY)
    // if(this.state.lines[id].tasksPos.length !== 0) {
    //   this.state.lines[id].tasksPos.map(pos => {
    //     console.log(taskPos, pos, pos - taskPos)
    //     pos - taskPos < 60 ? console.log('<60' ) : console.log('>60')
    //   })
    // }

    this.state.tasksPos.push(taskPos)

    this.setState({ tasksPos: this.state.tasksPos })
  }

  taskClick = e => e.stopPropagation()

  tabChange = (e, value) => this.setState({ value })

  render() {
    const { classes } = this.props
    const { value, lineHeight, tasksPos } = this.state
    return (
      <React.Fragment>
        <AppBar position="fixed">

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

        </AppBar>

        {value 
          ? <Line 
            />
          : <Notes />}
      
      </React.Fragment>
    )
  }
} 

export default withStyles(styles)(App)