import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  wrap: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  lineWrap: {
    width: 'fit-content',
    backgroundColor: '#eee',
    margin: '0 0 0 60%',
    zIndex: '2'
  },

  fullHeightLine: {
    width: '30px',
    height: '101vh',
    backgroundColor: '#a2a2a2',
    position: 'relative',
    cursor: 'pointer',
    transform: 'rotate(180deg)'
  },

  task: {
    width: '40px',
    height: '40px',
    backgroundColor: 'green',
    position: 'absolute',
    left: '0',
    transform: 'translate(-15%, -70%)',
    borderRadius: '50%',
    zIndex: '1',
    transition: 'all .2s linear',
    willChange: 'top',
  },

  textWrap: {
    position: 'absolute',
    // right: '-500%',
    bottom: '50%',
    transform: 'rotate(180deg) translate(-50%, -50%)',
    padding: '10px'
  },

  text: {
    width: '14vw'
  },
  
  taskFormField: {
    padding: '20px',
  }
})

class Line extends React.Component {
  state = {
    lineHeight: 101,
    tasksPos: [],
    taskDrawer: false
  }

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY === 0) {
      this.setState({ lineHeight: this.state.lineHeight + 100 })
      window.scrollBy(0, windowHeight)
    }
  }

  taskClick = e => {
    e.stopPropagation()

  }

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY
    
    this.setState(prevState => {
      const { tasksPos } = prevState
      tasksPos.push(taskPos)
      tasksPos
        .sort((current, next) => current - next)
        .reverse()
        .forEach((taskPos, i, array) => {
          const diffBtwTasks = taskPos - array[1 + i]
          if(diffBtwTasks < 60) {          
            console.log(diffBtwTasks)
            for (let j = 0; j <= i; j++) 
              tasksPos[j] = tasksPos[j] + 61 - diffBtwTasks        
          } 
        })

      return { tasksPos: this.state.tasksPos }
    }, () => this.setState({taskDrawer: !this.state.taskDrawer}))
  }

  componentDidMount() {
    window.scrollBy(0, 5)
    window.addEventListener('scroll', this.makeLine)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }

  render() {
    const { classes } = this.props
    const { lineHeight, tasksPos, taskDrawer } = this.state

    return (
      <div  className={classes.wrap}>

        <div className={classes.lineWrap}>
          <div 
            style={{ height: `${lineHeight}vh` }} 
            className={classes.fullHeightLine}
            onClick={this.makeTask}
          >
            {tasksPos.map((pos, i) => 
              <div
                key={i}
                style={{ top: `${pos}px` }}
                className={classes.task}
                onClick={this.taskClick}
              > 
                <Paper className={classes.textWrap}>
                  <Typography  className={classes.text} component="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Typography>
                </Paper>
              </div>
            )}
          </div>
        </div>
          
        <Drawer open={taskDrawer} anchor="right"> 
          <Typography align="center" component="h3">task header</Typography>
          <TextField margin="dense" className={classes.taskFormField} />

          <Typography align="center" component="h3">task description</Typography>
          <TextField  margin="dense" multiline className={classes.taskFormField} />

          <Typography align="center" component="h3">task header</Typography>
          <TextField id="datetime-local" type="datetime-local" className={classes.taskFormField}/>
        </Drawer>
        
      </div>
    )
  }
} 

export default withStyles(styles)(Line)