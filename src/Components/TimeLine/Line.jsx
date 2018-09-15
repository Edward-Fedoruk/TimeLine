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
    scrollingWithTask: false
  }

  refTimePicker = React.createRef()
  timer = null
  ScrollInterval = null
  ScrollInterval = null

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

  taskLteAndExist = (arr, i, prop, wrap) => 
    arr[i + 1] && wrap(arr[i][prop]) < wrap(arr[i + 1][prop])

  taskGteAndExist = (arr, i, prop, wrap) => 
    arr[i - 1] && wrap(arr[i][prop]) > wrap(arr[i - 1][prop])

  getDateFromPicker = () => {
    const dateFromPicker = this.refTimePicker.current.value
    const fullDate = `${new Date(dateFromPicker)}`
    const [ , month, day, year, time ] = fullDate.split(' ')
    const [ hour, minute ] = time.split(':')

    return { month, day, year, time, hour, minute, dateFromPicker }
  }

  setDateInTask = (task, fullDate, taskDay, taskHour, taskYear) => {
    task.fullDate = fullDate
    task.taskDay = taskDay
    task.taskHour = taskHour
    task.taskYear = taskYear
  }
  
  setTaskInformation = () => {
    const date = this.getDateFromPicker()
    const id = i => i 

    this.setState(({ allTasks, indexOfCurrentTask, taskHeader, taskDescription }) => { 
      this.setDateInTask(
        allTasks[indexOfCurrentTask], 
        date.dateFromPicker, 
        date.day, 
        date.hour + ':' + date.minute, 
        new Date().getFullYear() - date.year === 0 ? '' : date.year
      )
      allTasks[indexOfCurrentTask].taskHeader = taskHeader
      allTasks[indexOfCurrentTask].taskDescription = taskDescription

      const tempTask = allTasks[indexOfCurrentTask]
      allTasks.sort((current, next) => Date.parse(next.fullDate) - Date.parse(current.fullDate))
      indexOfCurrentTask = allTasks.indexOf(tempTask)

      allTasks[indexOfCurrentTask].opacity = '1'
      
      if(this.taskLteAndExist(allTasks, indexOfCurrentTask, 'taskPos', id)) {
        allTasks[indexOfCurrentTask].taskPos = allTasks[indexOfCurrentTask + 1].taskPos 
        for (let i = 0; i <= indexOfCurrentTask; i++) allTasks[i].taskPos += 60
      }
      
      if(this.taskGteAndExist(allTasks, indexOfCurrentTask, 'taskPos', id)) {
        allTasks[indexOfCurrentTask].taskPos = allTasks[indexOfCurrentTask - 1].taskPos
        for (let i = 0; i < indexOfCurrentTask; i++) allTasks[i].taskPos += 60
      }

      return { taskDrawer: false, animation: true, taskHeader: '', taskDescription: '' }
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
      () => window.scrollBy(0, windowHeight))
    }
  }

  scrollOnDrag = e => {
    const clientY = e.clientY || e.touches[0].clientY
    const mousePos = window.innerHeight - clientY
    const scrollTopStart = window.innerHeight / 2 + 100
    const scrollBottomStart = window.innerHeight / 2 - 200
    const doc = document.documentElement
    
    if(mousePos > scrollBottomStart && mousePos < scrollTopStart) {
      clearInterval(this.ScrollInterval)
      this.setState({ scrollingWithTask: false })  
    }

    if(mousePos > scrollTopStart && !this.state.scrollingWithTask) {
      this.ScrollInterval = 
        setInterval(() => { 
          console.log('scrolling top')
          window.scrollBy(0, -5) 
          if(doc.scrollTop !== 0) 
            this.setState(({ indexOfCurrentTask, allTasks }) => 
              allTasks[indexOfCurrentTask].taskPos += 5)
        }, 10)
      this.setState({ scrollingWithTask: true })  
    } 
    else if(mousePos < scrollBottomStart && !this.state.scrollingWithTask) {      
      this.ScrollInterval = 
        setInterval(() => { 
          window.scrollBy(0, 5)
          if(doc.scrollTop + window.innerHeight !== doc.scrollHeight){
            this.setState(({ indexOfCurrentTask, allTasks }) => 
              allTasks[indexOfCurrentTask].taskPos -= 5)
          }
        }, 10)
      this.setState({ scrollingWithTask: true })  
    } 
  }

  taskDrag = e => {
    e.persist()
    this.scrollOnDrag(e)
    this.setState(({ indexOfCurrentTask, allTasks }) => {
      const pageY =  e.pageY || e.touches[0].pageY
      console.log(e.touches[0])
      allTasks[indexOfCurrentTask].taskPos = document.documentElement.scrollHeight - pageY
      return { allTasks }
    })
  }

  waitForDnD = taskIndex => e => {
    if([...e.target.classList].includes('task')) 
      this.timer = setTimeout(() => {
        console.log('can drag')
        this.setState({ canDrag: true, animation: false, canClick: false, indexOfCurrentTask: taskIndex })
      }, 1500)
  }   

  resetDraggedTask = () => this.setState({ canClick: true })

  cancelDnD = (e) => {
    clearInterval(this.ScrollInterval)
    clearTimeout(this.timer)
    if(this.state.canDrag) {
      this.setState(({ indexOfCurrentTask, allTasks }) => {
        const temp = allTasks[indexOfCurrentTask]
        allTasks.sort((current, next) => next.taskPos - current.taskPos)
        indexOfCurrentTask = allTasks.indexOf(temp)

        if(this.taskLteAndExist(allTasks, indexOfCurrentTask, 'fullDate', Date.parse)) {
          const nextTask = allTasks[indexOfCurrentTask + 1]
          this.setDateInTask(
            allTasks[indexOfCurrentTask],
            nextTask.fullDate,
            nextTask.taskDay,
            nextTask.taskHour,
            nextTask.taskYear
          )
        }

        else if(this.taskGteAndExist(allTasks, indexOfCurrentTask, 'fullDate', Date.parse)) {
          const prevTask = allTasks[indexOfCurrentTask - 1]
          this.setDateInTask(
            allTasks[indexOfCurrentTask],
            prevTask.fullDate,
            prevTask.taskDay,
            prevTask.taskHour,
            prevTask.taskYear
          )
        }

        allTasks.forEach(this.makeSpacesBtwTasks)

        return { canDrag: false, animation: false, scrollingWithTask: false }
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
      <div 
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        onMouseMove={canDrag ? this.taskDrag : null}
        onMouseUp={this.cancelDnD}
        onTouchEnd={this.cancelDnD}
        onTouchMove={canDrag ? this.taskDrag : null}
      >
        <div className={classes.lineWrap}>
          <div 
            style={{ height: `${lineHeight}vh` }} 
            className={classes.fullHeightLine}
            onClick={this.makeTask}
          >
            {allTasks.map((task, i) => {
              console.log('rerendering')
              return <Task 
                key={i}
                task={task}
                animation={animation}
                waitForDnD={this.waitForDnD(i)}
                taskClick={this.taskClick(i)}
                resetDraggedTask={this.resetDraggedTask}
                canClick={canClick}
              />
            })}
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
      </div>
    )
  }
  
}

export default withStyles(styles)(Line)