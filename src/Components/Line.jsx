import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

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
    width: '100%'
  },

  drawerWrap: {
    maxHeight: '1000px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 'min-content'
  },

  dateWrap: {
    bottom: '50%',
    transform: 'rotate(180deg) translate(150%, -50%)',
    position: 'absolute',
    display: 'flex',
    width: '100px',
    justifyContent: 'space-between'
  }
})

class Line extends React.Component {
  state = {
    lineHeight: 101,
    allTasks: [],
    taskDrawer: false,
    taskHeader: '',
    taskDescription: '',
    indexOfCurrentTask: Number,
    currentTaskDate: ''
  }

  refTimePicker = React.createRef()

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY === 0) {
      this.setState({ lineHeight: this.state.lineHeight + 100 })
      window.scrollBy(0, windowHeight)
    }
  }

  taskClick = taskIndex => e => {
    e.stopPropagation()
    // console.log(this.state.allTasks[taskIndex])
    this.setState({ 
      taskDrawer: !this.state.taskDrawer,
      taskHeader: this.state.allTasks[taskIndex].taskHeader,
      taskDescription: this.state.allTasks[taskIndex].taskDescription,
      indexOfCurrentTask: taskIndex,
      currentTaskDate: this.state.allTasks[taskIndex].fullDate
    })
  }

  setTaskInformation = () => {
    const dateFromPicker = this.refTimePicker.current.value
    const date = `${new Date(dateFromPicker)}`
    const [ , month, day, year, time ] = date.split(' ')
    const [ hour, minute ] = time.split(':')

    this.setState(({ allTasks, indexOfCurrentTask, taskHeader, taskDescription }) => { 
      allTasks[indexOfCurrentTask].taskDay = month + ' ' + day
      allTasks[indexOfCurrentTask].taskHour = hour + ':' + minute
      allTasks[indexOfCurrentTask].fullDate = dateFromPicker
      allTasks[indexOfCurrentTask].taskYear = 
        new Date().getFullYear() - year === 0 ? '' : year
      allTasks[indexOfCurrentTask].taskHeader = taskHeader
      allTasks[indexOfCurrentTask].taskDescription = taskDescription

      allTasks.sort((currentTask, nextTask) => {
        console.log(currentTask, nextTask)
        if(Date.parse(currentTask.fullDate) - Date.parse(nextTask.fullDate) < 0) {
          console.log('<0')
          const temp = nextTask.taskPos 
          nextTask.taskPos = currentTask.taskPos 
          currentTask.taskPos = temp
          return 1
        } 
        else {
          console.log('>0')
          return -1
        }
      })

      return { taskDrawer: false, allTasks }
    })
  }

  drawerClose = () => {
    console.log( /\S/.test(this.state.taskHeader))
    this.state.taskHeader === '' || !/\S/.test(this.state.taskHeader) 
      ? this.deleteTask()
      : this.setTaskInformation()
  }
  
  setTaskFields = field => e => {
    const event = e.target
    this.setState(({ allTasks }) => {
      return { allTasks, [field]: event.value }
    })
  }

  changeDate = (e) => 
    this.setState({currentTaskDate: e.target.value})
  

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY

    this.setState(({ allTasks, taskDrawer }) => {
      const task = { taskPos, taskHeader: '', taskDescription: '' }
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
      }
    })

  }

  deleteTask = () => 
    this.setState(({allTasks, indexOfCurrentTask}) => {
      allTasks.splice(indexOfCurrentTask, 1)
      return { allTasks, taskDrawer: false }
    })

  getCurrentDate = () => {
    const date = new Date()
    const editDate = x => x < 10 ? '0' + x : x

    const year = date.getFullYear()
    const month = editDate(1 + date.getMonth())
    const day = editDate(date.getDate())
    const hours = editDate(date.getHours())
    const minutes = editDate(date.getMinutes())

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  componentDidMount() {
    window.scrollBy(0, 5)
    window.addEventListener('scroll', this.makeLine)
    
    ValidatorForm.addValidationRule('isOnlySpaces', value => {
      if(/\S/.test(value)) {
        return true
      }
      return false
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }

  render() {
    const { classes } = this.props
    const { lineHeight, allTasks, 
            taskDrawer, taskHeader, 
            taskDescription, currentTaskDate } = this.state
            
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
                onClick={this.taskClick(i)}
              > 

                <Paper className={classes.textWrap}>
                  <Typography  
                    className={classes.text} 
                    component="p"
                  >
                    {task.taskHeader}
                  </Typography>
                </Paper>

                <Paper className={classes.dateWrap}>
                  <Typography  
                    className={classes.dayText} 
                    component="p"
                  >
                    {task.taskDay}
                  </Typography>
                  <Typography  
                    className={classes.dayText} 
                    component="p"
                  >
                    {task.taskHour}
                  </Typography>
                </Paper>

              </div>
            )}
          </div>
        </div>
          
        <Drawer onClose={this.drawerClose} open={taskDrawer} anchor="right"> 
          <div className={classes.drawerWrap}>
            <ValidatorForm onSubmit={this.setTaskInformation}>
              <Typography 
                align="center" 
                component="h3"
              >
                task header
              </Typography>
              <TextValidator 
                margin="dense" 
                onChange={this.setTaskFields("taskHeader")} 
                name="taskHeader" 
                value={taskHeader} 
                multiline 
                validators={['required', 'isOnlySpaces', 'minStringLength:1', 'maxStringLength:16']}
                errorMessages={['this field is required', 'must cosist not only from spaces', 'must contain at least 1 characters', 'password must contain no more then 50 characters']}
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
                value={
                  currentTaskDate === '' 
                    ? this.getCurrentDate() 
                    : currentTaskDate
                }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.changeDate}
                inputRef={this.refTimePicker}
                className={classes.taskFormField} 
              />

              <Button type="submit">OK</Button>
              <Button onClick={this.deleteTask}>Delete</Button>
            </ValidatorForm>
          </div>
        </Drawer>

      </div>
    )
  }
} 

export default withStyles(styles)(Line)