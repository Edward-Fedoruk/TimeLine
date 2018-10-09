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
  ],
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
    updTasks: false,
    currentIndex: null
  }

   
  /*check if date atribute exist.
    If it exist then user clicked on 
    lineBlock and right drawer will appear.*/ 
  openTaskMenu = e => {
    const dataTimeblock = e.target.dataset.timeblock
    const dataTask = e.target.dataset.task

    if(dataTimeblock)
      this.setState({ taskDrawer: true, taskDate: new Date() }) 

    else if(dataTask) { 
      const taskPos = dataTask.split(' ').map(numb => parseInt(numb))
      const [year, month, day, task] = taskPos

      const selectedTask = this.state.allTasks[year][month][day][task]
      const taskDate   = selectedTask.date
      const taskHeader = selectedTask.header
      const taskDescr  = selectedTask.description
      
      this.setState({ 
        taskDate,
        taskHeader,
        taskDescr,
        taskDrawer: true,
        currentIndex: taskPos,
        updTasks: !this.state.updTasks
      })
    }
  }

  addTask({ taskHeader, taskDescr, taskDate, allTasks, updTasks }) {
    const date = new Date(taskDate)
    const taskYear  = date.getFullYear()
    const taskMonth = date.getMonth() + 1
    const taskDay   = date.getDate()
    
    const task = {
      date:         `${date}`,
      header:       `${taskHeader}`,
      description:  `${taskDescr}`
    }

    const getYear   = timeBlock => new Date(timeBlock[0][0][0].date).getFullYear()
    const getMonth  = timeBlock => new Date(timeBlock[0][0].date).getMonth() + 1
    const getDay    = timeBlock => new Date(timeBlock[0].date).getDate()
    const parseDate = timeBlock => Date.parse(timeBlock.date)

    const sortByDate = (timeFunc, ASC) => (a, b) => 
      ASC ? timeFunc(a) - timeFunc(b) : timeFunc(b) - timeFunc(a)

    const makeDate = (tasksArr, newTask, sortFunc) => {
      tasksArr.push(newTask)
      tasksArr.sort(sortFunc)
    }

    const setTaskInfo = (year, month, day, index) => {
      switch(index) {
        case 0: {          
          console.log(allTasks)
          if(allTasks.length === year) 
            makeDate(allTasks, [[[task]]], sortByDate(getYear, true))

          else if(new Date(allTasks[year][month][day][0].date).getFullYear() === taskYear)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year + 1, month, day, index)
        } break

        case 1: {
          const yearBlock = allTasks[year]

          if(yearBlock.length === month) 
            makeDate(yearBlock, [[task]], sortByDate(getMonth, false))
      
          else if(new Date(allTasks[year][month][day][0].date).getMonth() + 1 === taskMonth) 
            setTaskInfo(year, month, day, index + 1)
            
          else setTaskInfo( year, month + 1, day, index)
        } break

        case 2: {
          const monthBlock = allTasks[year][month]

          if(monthBlock.length === day) 
            makeDate(monthBlock, [task], sortByDate(getDay, false)) 

          else if(new Date(allTasks[year][month][day][0].date).getDate() === taskDay)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year, month, day + 1, index)
        } break

        case 3: 
          makeDate(allTasks[year][month][day], task, sortByDate(parseDate, false))
          break
      }          
    }

    setTaskInfo(0, 0, 0, 0)

    return { allTasks, taskDrawer: false, currentIndex: null, updTasks: !updTasks }
  }

  /*
    pushing task in allTasks array     
  */
  submitTask = () => {
    if(this.state.currentIndex == null) {
      this.setState(this.addTask)
    }
    else {
      this.setState(({ allTasks, taskHeader, taskDate, taskDescr, updTasks, currentIndex }) => {
        const [ year, month, day, task ] = currentIndex
        const selectedTask = allTasks[year][month][day][task]

        selectedTask.date        = taskDate
        selectedTask.header      = taskHeader
        selectedTask.description = taskDescr

        return {allTasks, updTasks: !updTasks, taskDrawer: false, currentIndex: null}
      })
    }
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