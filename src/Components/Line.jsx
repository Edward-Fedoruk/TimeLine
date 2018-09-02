import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
    allTasks: [],
    taskDrawer: false,
    taskHeader: '',
    taskDescription: '',
    indexOfCurrentTask: Number
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

  drawerClose = () => this.setState ({ taskDrawer: false })
  
  setTaskFields = field => e => {
    const event = e.target
    this.setState(({ allTasks, indexOfCurrentTask }) => {
      allTasks[indexOfCurrentTask][field] = this.state[field]
      return { allTasks, [field]: event.value }
    })
  }

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY

    this.setState(({ allTasks, taskDrawer }) => {
      const task = { taskPos }
      allTasks.push(task)
      allTasks
        .sort((current, next) => current.taskPos - next.taskPos)
        .reverse()
        .forEach((task, i, array) => {
          const diffBtwTasks = array[1 + i] === undefined 
            ? NaN 
            : task.taskPos - array[1 + i].taskPos

          if(diffBtwTasks < 60)     
            for (let j = 0; j <= i; j++) 
              allTasks[j].taskPos = allTasks[j].taskPos + 61 - diffBtwTasks        
        })

      return { 
        allTasks: allTasks, 
        taskDrawer: !taskDrawer,
        indexOfCurrentTask: allTasks.indexOf(task),
        taskHeader: '',
        taskDescription: ''
      }
    })

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
    const { lineHeight, allTasks, 
            taskDrawer, taskHeader, 
            taskDescription } = this.state

    return (
      <div  className={classes.wrap}>

        <div className={classes.lineWrap}>
          <div 
            style={{ height: `${lineHeight}vh` }} 
            className={classes.fullHeightLine}
            onClick={this.makeTask}
          >
            {allTasks.map((task, i) => 
              <div
                key={i}
                style={{ top: `${task.taskPos}px` }}
                className={classes.task}
                onClick={this.taskClick}
              > 
                <Paper className={classes.textWrap}>
                  <Typography  
                    className={classes.text} 
                    component="p"
                  >
                    {task.taskHeader}
                  </Typography>
                </Paper>
              </div>
            )}
          </div>
        </div>
          
        <Drawer onClose={this.drawerClose} open={taskDrawer} anchor="right"> 
          <Typography 
            align="center" 
            component="h3"
          >
            task header
          </Typography>
          <TextField 
            margin="dense" 
            onChange={this.setTaskFields("taskHeader")} 
            autoFocus	
            required 
            value={taskHeader} 
            inputProps={{maxLength: "50"}}
            multiline 
            className={classes.taskFormField} 
          />
              
          <Typography 
            align="center" 
            component="h3"
          >
            task description
          </Typography>
          <TextField  
            margin="dense" 
            rowsMax="15" 
            multiline 
            inputProps={{maxLength: "150"}}
            onChange={this.setTaskFields("taskDescription")}
            value={taskDescription}
            className={classes.taskFormField} 
          />

          <Typography 
            align="center" 
            component="h3"
          >
            task time
          </Typography>
          <TextField 
            type="datetime-local" 
            className={classes.taskFormField}
          />

          <Button onClick={this.drawerClose}>OK</Button>
        </Drawer>

      </div>
    )
  }
} 

export default withStyles(styles)(Line)