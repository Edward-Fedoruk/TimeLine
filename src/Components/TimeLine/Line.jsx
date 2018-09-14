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
  

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY
    console.log(e.target)
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
    e.stopPropagation()
    e.persist()
    this.setState(({ indexOfCurrentTask, allTasks }) => {
      allTasks[indexOfCurrentTask].taskPos = document.documentElement.scrollHeight - e.pageY

      // if(allTasks[indexOfCurrentTask - 1]) {
      //   if(allTasks[indexOfCurrentTask].taskPos > allTasks[indexOfCurrentTask - 1].taskPos) {
      //     allTasks[indexOfCurrentTask].fullDate = allTasks[indexOfCurrentTask - 1].fullDate
      //     allTasks[indexOfCurrentTask].taskDay = allTasks[indexOfCurrentTask - 1].taskDay
      //     allTasks[indexOfCurrentTask].taskHour = allTasks[indexOfCurrentTask - 1].taskHour
      //     allTasks[indexOfCurrentTask].taskYear = allTasks[indexOfCurrentTask - 1].taskYear

      //     const temp = allTasks[indexOfCurrentTask - 1]
      //     allTasks[indexOfCurrentTask - 1] = allTasks[indexOfCurrentTask]
      //     allTasks[indexOfCurrentTask] = temp 

      //     indexOfCurrentTask--
      //   }
      // }
      return { allTasks }
    })
  }

  waitForDnD = taskIndex => e => {
    if([...e.target.classList].includes('task')) {
      this.timer = setTimeout(() => {
        this.setState({ canDrag: true, animation: false, canClick: false, indexOfCurrentTask: taskIndex})
        console.log('can drag')
      }, 2000)
    }
  }   

  resetDraggedTask = i => __ => 
    this.setState({ indexOfCurrentTask: i, canClick: true })

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

       allTasks.forEach((task, i, array) => {
        const diffBtwTasks = array[1 + i] === undefined 
          ? NaN 
          : task.taskPos - array[1 + i].taskPos

        if(diffBtwTasks < 60)     
          for (let j = 0; j <= i; j++) 
            allTasks[j].taskPos = allTasks[j].taskPos + 61 - diffBtwTasks        
      })

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