import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Year from './Year'
import TaskDrawer from './TaskDrawer'
import mountains from '../../assets/mountains.png'

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
    height: 'calc(100vh - 48px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '100vw',
    position: 'absolute',
    bottom: '0',
    backgroundColor: '#663A92',
    backgroundImage: `url(${mountains})`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    '&::before': {
      content: "''",
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'block',
      opacity: '0.84',
      background: 'radial-gradient(93.13rem at 100% 100%, #361BB2 0%, #C567D8 100%)'
    }
  },

  line: {
    width: '12px',
    position: 'absolute',
    left: '75%',
    minHeight: '100vh',
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    transform: 'rotate(180deg)'
  },

  overlay: {
    zIndex: '20',

  }
})

class TimeLine extends React.Component {
  state = {
    allTasks: [],
    mode: 0,
    taskDrawer: false,
    taskInfo: {
      header: '',
      desc: '',
      date: new Date(),
    },
    taskPrevDate: '',
    updTasks: false,
    currentIndex: null,
    taskCreation: false
  }
   
  /*check if date attribute exist.
    If it exist then user clicked on 
    lineBlock and right drawer will appear.*/ 
  openTaskMenu = e => {
    const clickedOnLine = e.target.dataset.timeblock
    const taskPos = e.target.dataset.task

    if(clickedOnLine)
      this.setState({ taskDrawer: true, taskInfo: { date: new Date(), header: '', desc: '' }, taskCreation: true }) 

    else if(taskPos) { 
      const taskCoordinates = taskPos.split(' ').map(numb => parseInt(numb))
      const [ year, month, day, task ] = taskCoordinates

      const selectedTask = this.state.allTasks[year][month][day][task]

      this.setState({ 
        taskInfo: {
          header: selectedTask.header,
          desc:   selectedTask.description,
          date:   selectedTask.date,
        },
        taskPrevDate: selectedTask.date, 
        taskDrawer:   true,
        currentIndex: taskCoordinates,
        updTasks:     !this.state.updTasks,
        taskCreation: false
      })
    }
  }
  
  cancelCreation = () => this.setState({ taskDrawer: false })

  addTask({ taskInfo, allTasks, updTasks }) {
    // take date from submitted task form
    const date = new Date(taskInfo.date)
    const yearOfNewTask  = date.getFullYear()
    const monthOfNewTask = date.getMonth() + 1
    const dayOfNewTask   = date.getDate()
    
    const task = {
      date:        `${date}`,
      header:      `${taskInfo.header}`,
      description: `${taskInfo.desc}`
    }

    // simple date pickers for 4d array
    const getYear   = timeBlock => new Date(timeBlock[0][0][0].date).getFullYear()
    const getMonth  = timeBlock => new Date(timeBlock[0][0].date).getMonth() + 1
    const getDay    = timeBlock => new Date(timeBlock[0].date).getDate()
    const parseDate = timeBlock => Date.parse(timeBlock.date)

    /* sort function. Takes in date picker function, ASC (ascending).
       Return sort function (a, b) -> number.
       If ASC was true then tasks array will be sorted in ascending order. */
    const withDateFunc = (timeFunc, ASC) => (a, b) => 
      ASC ? timeFunc(a) - timeFunc(b) : timeFunc(b) - timeFunc(a)

    // wrapper function for readability 
    const insetIn = (tasksArr, newTask) => tasksArr.push(newTask)
    const sort = (tasksArr, sortFunc) => tasksArr.sort(sortFunc)

    // Recursively iterate through tasks array 
    // finding where to put task
    const setTaskInfo = (year, month, day, index) => {
      switch(index) {
        case 0:         
          if(allTasks.length === year) {
            insetIn(allTasks, [[[task]]])
            sort(allTasks, withDateFunc(getYear, true))
          }

          else if(new Date(allTasks[year][month][day][0].date).getFullYear() === yearOfNewTask) 
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year + 1, month, day, index)
        break

        case 1: 
          const months = allTasks[year]

          if(months.length === month) {
            insetIn(months, [[task]])
            sort(months, withDateFunc(getMonth, false))
          }

          else if(new Date(allTasks[year][month][day][0].date).getMonth() + 1 === monthOfNewTask)
            setTaskInfo(year, month, day, index + 1)
            
          else setTaskInfo( year, month + 1, day, index)
        break

        case 2: 
          const days = allTasks[year][month]

          if(days.length === day) {
            insetIn(days, [task])
            sort(days, withDateFunc(getDay, false))
          }

          else if(new Date(allTasks[year][month][day][0].date).getDate() === dayOfNewTask)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year, month, day + 1, index)
        break

        case 3: 
          const tasks = allTasks[year][month][day]
          insetIn(tasks, task)
          sort(tasks, withDateFunc(parseDate, false))
        break
      }          
    }

    setTaskInfo(0, 0, 0, 0)

    return { 
      allTasks, 
      taskDrawer: false, 
      currentIndex: null, 
      updTasks: !updTasks,
      taskInfo: {
        header: '',
        desc: '',
        date: new Date()
      }
    }
  }

  deleteTask = ({ currentIndex, allTasks, updTasks }) => {
    const [ year, month, day, task ] = currentIndex
    allTasks[year][month][day].splice(task, 1)

    if(allTasks[year][month][day].length === 0)
      allTasks[year][month].splice(day, 1)

    if(allTasks[year][month].length === 0)
      allTasks[year].splice(month, 1)

    if(allTasks[year].length === 0)
      allTasks.splice(year, 1)
    
    return { allTasks, currentIndex: null, taskDrawer: false, updTasks: !updTasks }
  }

  changeTaskPosition = () => this.setState(state => {
    this.deleteTask(state)
    return this.addTask(state)
  })
  
  changeTaskFields(state) {
    const [ year, month, day, task ] = state.currentIndex
    const selectedTask = state.allTasks[year][month][day][task]
    
    selectedTask.date = state.taskInfo.date
    selectedTask.header = state.taskInfo.header
    selectedTask.description = state.taskInfo.desc

    return { 
      taskDrawer: false,
      allTasks: state.allTasks,
      taskInfo: {
        header: '',
        desc: '',
        date: new Date(),
      },
      updTasks: !state.updTasks
    }
  }

  submitTask = () => {
    // when a user clicked on the line
    if(this.state.currentIndex == null) 
      this.setState(this.addTask)

    // when a user changed task date
    else if(this.state.taskPrevDate !== this.state.taskInfo.date) 
      this.changeTaskPosition()
    
    // when a user clicked on the task and hasn't changed  date
    else this.setState(this.changeTaskFields)
  }

  setTaskFields = field => e => {
    const fieldValue = e.target.value
    this.setState(({ taskInfo }) =>  {
      taskInfo[field] = fieldValue 
      return { taskInfo }
    })
  }

  setTaskDate = date => this.setState(({ taskInfo }) => taskInfo.date = date)

  componentDidMount() {
    // fetch date and set in state and global var
    this.setState({ allTasks: tasks })
  }

  componentDidUpdate() {
    // console.log('timeLine upd')
  }

  render() {
    const { classes } = this.props
    const { 
      allTasks, mode, taskDrawer,
      taskInfo, updTasks, taskCreation
    } = this.state

    return (
      <div className={classes.lineWrap}>

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
          closeTaskDrawer={this.closeTaskDrawer}
          taskDrawer={taskDrawer}
          submitTask={this.submitTask}
          taskInfo={taskInfo}
          setTaskFields={this.setTaskFields}
          setTaskDate={this.setTaskDate}
          deleteTask={() => this.setState(this.deleteTask)}
          taskCreation={taskCreation}
          cancelCreation={this.cancelCreation}
        />
      </div>
    )
  }
}

export default withStyles(styles)(TimeLine)