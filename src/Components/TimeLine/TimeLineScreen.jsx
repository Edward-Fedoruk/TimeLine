import React from 'react'
import { withStyles } from '@material-ui/core'
import Line from './Line'
import TaskDrawer from './TaskDrawer'

const styles = (theme) => ({
  wrap: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
})

class TimeLineScreen extends React.Component {
  state = {
    lineHeight: 300,
    allTasks: [],
    taskDrawer: false,
    taskHeader: '',
    taskDescription: '',
    indexOfCurrentTask: Number,
    currentTaskDate: '',
    animation: false,
  }
  
  refTimePicker = React.createRef()

  taskClick = taskIndex => e => {
    e.stopPropagation()
    this.setState({ 
      taskDrawer: !this.state.taskDrawer,
      taskHeader: this.state.allTasks[taskIndex].taskHeader,
      taskDescription: this.state.allTasks[taskIndex].taskDescription,
      indexOfCurrentTask: taskIndex,
      currentTaskDate: this.state.allTasks[taskIndex].fullDate
    })
  }

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY

    this.setState(({ allTasks, taskDrawer }) => {
      const task = { taskPos, taskHeader: '', taskDescription: '', animation: false, opacity: '0.3' }
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
        allTasks, 
        taskDrawer: !taskDrawer,  
        indexOfCurrentTask: allTasks.indexOf(task),
        animation: false,
      }
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

      const task = allTasks[indexOfCurrentTask]

      allTasks.sort((current, next) => Date.parse(next.fullDate) - Date.parse(current.fullDate))
      const test = allTasks.indexOf(task)

      allTasks[test].opacity = '1'
      
      if(allTasks[test + 1]) {
        if(allTasks[test].taskPos < allTasks[test + 1].taskPos) {
          allTasks[test].taskPos = allTasks[test + 1].taskPos 
          for (let i = 0; i <= test; i++) 
            allTasks[i].taskPos += 60
        }
      }

      if(allTasks[test - 1]) {
        if(allTasks[test].taskPos > allTasks[test - 1].taskPos) {
          allTasks[test].taskPos = allTasks[test - 1].taskPos
          for (let i = 0; i < test; i++) 
            allTasks[i].taskPos += 60
        }
      }

      return { taskDrawer: false, allTasks, animation: true, taskHeader: '', taskDescription: '' }
    })
  }

  setTaskFields = field => e => {
    const event = e.target
    this.setState(({ allTasks }) => {
      return { allTasks, [field]: event.value }
    })
  }

  

  deleteTask = () => 
    this.setState(({allTasks, indexOfCurrentTask}) => {
      allTasks.splice(indexOfCurrentTask, 1)
      return { allTasks, taskDrawer: false }
    })

  render() {
    const { classes } = this.props
    const { lineHeight, allTasks, 
            taskDrawer, taskHeader, 
            taskDescription, currentTaskDate, 
            animation } = this.state 

    return (
      <div  className={classes.wrap}>
      
        <Line
          makeTask={this.makeTask}
          allTasks={allTasks}
          lineHeight={lineHeight}
          taskClick={this.taskClick}
          animation={animation}
        />

        <TaskDrawer
          taskDrawer={taskDrawer}
          setTaskInformation={this.setTaskInformation}
          setTaskFields={this.setTaskFields}
          deleteTask={this.deleteTask}
          refTimePicker={this.refTimePicker}
          currentTaskDate={currentTaskDate}
          taskHeader={taskHeader}
          taskDescription={taskDescription}
        />

      </div>
    )
  }
} 

export default withStyles(styles)(TimeLineScreen)