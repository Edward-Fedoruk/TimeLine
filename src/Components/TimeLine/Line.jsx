import React from 'react'
import { withStyles } from '@material-ui/core'
import Task from './Task'
import TaskDrawer from './TaskDrawer'

const styles = (theme) => ({
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
})

class Line extends React.Component  {
  state = {
    lineHeight: 300,
    canDrag: false,
    canClick: true,
    allTasks: [],
    taskDrawer: false,
    taskHeader: '',
    taskDescription: '',
    indexOfCurrentTask: Number,
    currentTaskDate: '',
    animation: false,
  }

  refTimePicker = React.createRef()
  timer = null

  taskClick = taskIndex => __ => 
    this.setState({ 
      taskDrawer: !this.state.taskDrawer,
      taskHeader: this.state.allTasks[taskIndex].taskHeader,
      taskDescription: this.state.allTasks[taskIndex].taskDescription,
      indexOfCurrentTask: taskIndex,
      currentTaskDate: this.state.allTasks[taskIndex].fullDate
    })
  
  makeSpacesBtwTasks = (task, i, array) => {
    const diffBtwTasks = array[1 + i] === undefined 
      ? NaN 
      : task.taskPos - array[1 + i].taskPos

    if(diffBtwTasks < 60)     
      for (let j = 0; j <= i; j++) 
        array[j].taskPos = array[j].taskPos + 61 - diffBtwTasks        
  }

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY
    this.setState(({ allTasks, taskDrawer }) => {
      const task = { taskPos, taskHeader: '', taskDescription: '', animation: false, opacity: '0.3' }
      allTasks.push(task)
      allTasks
        .sort((current, next) => next.taskPos - current.taskPos)
        .forEach(this.makeSpacesBtwTasks)
      
      return { 
        allTasks, 
        taskDrawer: !taskDrawer,  
        indexOfCurrentTask: allTasks.indexOf(task),
        animation: false,
      }
    })
  }

  taskLteAndExist = (arr, i) => 
    arr[i + 1] && arr[i].taskPos < arr[i + 1].taskPos

  taskGteAndExist = (arr, i) => 
    arr[i - 1] && arr[i].taskPos > arr[i - 1].taskPos

  takeDateFromPicker = () => {
    const dateFromPicker = this.refTimePicker.current.value
    const fullDate = `${new Date(dateFromPicker)}`
    const [ , month, day, year, time ] = fullDate.split(' ')
    const [ hour, minute ] = time.split(':')

    return { month, day, year, time, hour, minute, fullDate }
  }
  
  setTaskInformation = () => {
    const date = this.takeDateFromPicker()

    this.setState(({ allTasks, indexOfCurrentTask, taskHeader, taskDescription }) => { 
      allTasks[indexOfCurrentTask].taskDay = date.month + ' ' + date.day
      allTasks[indexOfCurrentTask].taskHour = date.hour + ':' + date.minute
      allTasks[indexOfCurrentTask].fullDate = date.fullDate
      allTasks[indexOfCurrentTask].taskYear = new Date().getFullYear() - date.year === 0 ? '' : date.year
      allTasks[indexOfCurrentTask].taskHeader = taskHeader
      allTasks[indexOfCurrentTask].taskDescription = taskDescription

      const tempTask = allTasks[indexOfCurrentTask]
      allTasks.sort((current, next) => Date.parse(next.fullDate) - Date.parse(current.fullDate))
      indexOfCurrentTask = allTasks.indexOf(tempTask)

      allTasks[indexOfCurrentTask].opacity = '1'
      
      if(this.taskLteAndExist(allTasks, indexOfCurrentTask)) {
        allTasks[indexOfCurrentTask].taskPos = allTasks[indexOfCurrentTask + 1].taskPos 
        for (let i = 0; i <= indexOfCurrentTask; i++) allTasks[i].taskPos += 60
      }
      
      if(this.taskGteAndExist(allTasks, indexOfCurrentTask)) {
        allTasks[indexOfCurrentTask].taskPos = allTasks[indexOfCurrentTask - 1].taskPos
        for (let i = 0; i < indexOfCurrentTask; i++) allTasks[i].taskPos += 60
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

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY <= 0) {
      this.setState({ lineHeight: this.state.lineHeight + 100 }, 
      () => {
        console.log(windowHeight)
        window.scrollBy(0, windowHeight)
      })
    }
  }

  taskDrag = e => {
    e.persist()
    this.setState(({ indexOfCurrentTask, allTasks }) => {
      allTasks[indexOfCurrentTask].taskPos = document.documentElement.scrollHeight - e.pageY
      return { allTasks }
    })
  }

  waitForDnD = taskIndex => e => {
    if([...e.target.classList].includes('task')) {
      this.timer = setTimeout(() => {
        this.setState({ canDrag: true, animation: false, canClick: false, indexOfCurrentTask: taskIndex})
        console.log('can drag')
      }, 1500)
    }
  }   

  resetDraggedTask = i => __ => this.setState({ indexOfCurrentTask: i, canClick: true })

  cancelDnD = (e) => {
    e.stopPropagation()
    clearTimeout(this.timer)
    if(this.state.canDrag) {
      this.setState(({ indexOfCurrentTask, allTasks }) => {
        const temp = allTasks[indexOfCurrentTask]
        allTasks.sort((current, next) => next.taskPos - current.taskPos)
        indexOfCurrentTask = allTasks.indexOf(temp)

        if(allTasks[indexOfCurrentTask + 1]) {
          if(Date.parse(allTasks[indexOfCurrentTask].fullDate) < Date.parse(allTasks[indexOfCurrentTask + 1].fullDate)) {
            allTasks[indexOfCurrentTask].fullDate = allTasks[indexOfCurrentTask + 1].fullDate
            allTasks[indexOfCurrentTask].taskDay = allTasks[indexOfCurrentTask + 1].taskDay
            allTasks[indexOfCurrentTask].taskHour = allTasks[indexOfCurrentTask + 1].taskHour
            allTasks[indexOfCurrentTask].taskYear = allTasks[indexOfCurrentTask + 1].taskYear
          }
        }

        if(allTasks[indexOfCurrentTask - 1]) {
          if(Date.parse(allTasks[indexOfCurrentTask].fullDate) > Date.parse(allTasks[indexOfCurrentTask - 1].fullDate)) {
            allTasks[indexOfCurrentTask].fullDate = allTasks[indexOfCurrentTask - 1].fullDate
            allTasks[indexOfCurrentTask].taskDay = allTasks[indexOfCurrentTask - 1].taskDay
            allTasks[indexOfCurrentTask].taskHour = allTasks[indexOfCurrentTask - 1].taskHour
            allTasks[indexOfCurrentTask].taskYear = allTasks[indexOfCurrentTask - 1].taskYear
          }
        }

       allTasks.forEach(this.makeSpacesBtwTasks)

        console.log( allTasks)
        return { canDrag: false, animation: true }
      })
      console.log('cant drag')
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }
  
  componentDidMount() {
    const windowHeight = document.documentElement.clientHeight * 3
    window.scrollBy(0, windowHeight)
    window.addEventListener('scroll', this.makeLine) 
  }

  render() {
    const { classes } = this.props
    const { canDrag, currentTaskDate, allTasks, 
            taskDrawer, taskHeader, taskDescription, 
            lineHeight, animation, canClick } = this.state

    return (
      <div className={classes.lineWrap}>
        <div 
          style={{ height: `${lineHeight}vh` }} 
          className={classes.fullHeightLine}
          onClick={this.makeTask}
          onMouseMove={canDrag ? this.taskDrag : null}
          onMouseUp={this.cancelDnD}
          ref={this.refLine}
        >
          {allTasks.map((task, i) => 
            <Task 
              key={i}
              task={task}
              animation={animation}
              waitForDnD={this.waitForDnD(i)}
              taskClick={this.taskClick(i)}
              resetDraggedTask={this.resetDraggedTask(i)}
              canClick={canClick}
              canDrag={canDrag}
            />
          )}
        </div>

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

export default withStyles(styles)(Line)