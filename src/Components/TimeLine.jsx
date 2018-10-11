import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Year from './Year'
import TaskDrawer from './TaskDrawer'

const tasks = 
[
  [ 
    [
      [
        {
          date: '2018-10-26T16:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-10-26T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ]
    ],

    [
      [
        {
          date: '2018-09-25T19:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-25T16:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-25T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],

      [
        {
          date: '2018-09-24T18:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-24T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-24T12:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],

      [
        {
          date: '2018-09-18T18:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-18T17:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],

      [
        {
          date: '2018-09-17T15:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-17T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],
    ],
  ],

  [
    [
      [
        {
          date: '2019-09-17T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ]
    ]
  ]
]

const styles = () => ({
  lineWrap: {
    height: '100vh',
    overflowY: 'scroll',
    width: '100vw',
    position: 'absolute',
    bottom: '0'
  },

  line: {
    width: '20px',
    position: 'absolute',
    left: '60%',
    minHeight: '100vh',
    backgroundColor: 'gray',
    transform: 'rotate(180deg)'
  }
})

class TimeLine extends React.Component {
  state = {
    allTasks: [],
    mode: 0,
    taskDrawer: false,
    taskHeader: '',
    taskDescr: '',
    taskDate: new Date(),
    taskPrevDate: '',
    updTasks: false,
    currentIndex: null
  }

   
  /*check if date attribute exist.
    If it exist then user clicked on 
    lineBlock and right drawer will appear.*/ 
  openTaskMenu = e => {
    const clickedOnLine = e.target.dataset.timeblock
    const taskPos = e.target.dataset.task

    if(clickedOnLine)
      this.setState({ taskDrawer: true, taskDate: new Date() }) 

    else if(taskPos) { 
      const taskCoordinates = taskPos.split(' ').map(numb => parseInt(numb))
      const [ year, month, day, task ] = taskCoordinates

      const selectedTask = this.state.allTasks[year][month][day][task]
      
      this.setState({ 
        taskDate: selectedTask.date,
        taskPrevDate: selectedTask.date, 
        taskHeader: selectedTask.header,
        taskDescr: selectedTask.description,
        taskDrawer: true,
        currentIndex: taskCoordinates,
        updTasks: !this.state.updTasks
      })
    }
  }

  addTask({ taskHeader, taskDescr, taskDate, allTasks, updTasks }) {
    const date = new Date(taskDate)
    const yearOfNewTask  = date.getFullYear()
    const monthOfNewTask = date.getMonth() + 1
    const dayOfNewTask   = date.getDate()
    
    const task = {
      date:        `${date}`,
      header:      `${taskHeader}`,
      description: `${taskDescr}`
    }

    const getYear   = timeBlock => new Date(timeBlock[0][0][0].date).getFullYear()
    const getMonth  = timeBlock => new Date(timeBlock[0][0].date).getMonth() + 1
    const getDay    = timeBlock => new Date(timeBlock[0].date).getDate()
    const parseDate = timeBlock => Date.parse(timeBlock.date)

    const withDateFunc = (timeFunc, ASC) => (a, b) => 
      ASC ? timeFunc(a) - timeFunc(b) : timeFunc(b) - timeFunc(a)

    const insetIn = (tasksArr, newTask) => tasksArr.push(newTask)
    const sort = (tasksArr, sortFunc) => tasksArr.sort(sortFunc)

    const setTaskInfo = (year, month, day, index) => {
      switch(index) {
        case 0: {          
          if(allTasks.length === year) {
            insetIn(allTasks, [[[task]]])
            sort(allTasks, withDateFunc(getYear, true))
          }

          else if(new Date(allTasks[year][month][day][0].date).getFullYear() === yearOfNewTask) 
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year + 1, month, day, index)
        } break

        case 1: {
          const months = allTasks[year]

          if(months.length === month) {
            insetIn(months, [[task]])
            sort(months, withDateFunc(getMonth, false))
          }

          else if(new Date(allTasks[year][month][day][0].date).getMonth() + 1 === monthOfNewTask)
            setTaskInfo(year, month, day, index + 1)
            
          else setTaskInfo( year, month + 1, day, index)
        } break

        case 2: {
          const days = allTasks[year][month]

          if(days.length === day) {
            insetIn(days, [task])
            sort(days, withDateFunc(getDay, false))
          }

          else if(new Date(allTasks[year][month][day][0].date).getDate() === dayOfNewTask)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year, month, day + 1, index)
        } break

        case 3: {
          const tasks = allTasks[year][month][day]
          insetIn(tasks, task)
          sort(tasks, withDateFunc(parseDate, false))
        } break
      }          
    }

    setTaskInfo(0, 0, 0, 0)

    return { allTasks, taskDrawer: false, currentIndex: null, updTasks: !updTasks }
  }

  changeTaskDate(state) {
    const [ year, month, day, task ] = state.currentIndex
    state.allTasks[year][month][day].splice(task, 1)

    if(state.allTasks[year][month][day].length === 0)
      state.allTasks[year][month].splice(day, 1)

    if(state.allTasks[year][month].length === 0)
      state.allTasks[year].splice(month, 1)

    if(state.allTasks[year].length === 0)
      state.allTasks.splice(year, 1)

    return this.addTask(state)
  }

  changeTaskFields(state) {
    const [ year, month, day, task ] = state.currentIndex
    const selectedTask = state.allTasks[year][month][day][task]
    
    selectedTask.date = state.taskDate
    selectedTask.header = state.taskHeader
    selectedTask.description = state.taskDescr

    return { state }
  }

  submitTask = () => {
    if(this.state.currentIndex == null) 
      this.setState(this.addTask)

    else if(this.state.prevDate !== this.state.taskDate) 
      this.setState(this.changeTaskDate)
    
    else 
      this.setState(this.changeTaskFields)
  }

  setTaskFields = field => e => {
    const target = e.target
    this.setState({ [field]: target.value })
  }

  componentDidMount() {
    // fetch date and set in state and global var
    this.initTasks = tasks
    this.setState({ allTasks: tasks })
  }

  render() {
    const { classes } = this.props
    const { 
      allTasks, mode, taskDrawer,
      taskHeader, taskDescr, taskDate,
      updTasks
    } = this.state

    return (
      <div className={classes.lineWrap}>

        <button onClick={() => this.setState({mode: mode + 1})}>+</button>

        <div 
          className={classes.line}
          onClick={this.openTaskMenu}
          data-timeblock="true"
        >
          {allTasks.map((months, i) =>
            <Year 
              mode={mode} 
              months={months} 
              updTasks={updTasks} 
              key={i} 
              yearIndex={i}
            />
          )}
        </div> 

        <TaskDrawer 
          taskDrawer={taskDrawer}
          submitTask={this.submitTask}
          taskHeader={taskHeader}
          taskDescr={taskDescr}
          taskDate={taskDate}
          setTaskFields={this.setTaskFields}
        />
      </div>
    )
  }
}

export default withStyles(styles)(TimeLine)