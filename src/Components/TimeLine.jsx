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
    taskDate: new Date()
  }

  /* 
    check if date atribute exist.
    If it exist then user clicked on 
    lineBlock and right drawer will appear.
  */  
  openTaskMenu = e => {
    const dataTimeblock = e.target.dataset.timeblock
    if(!dataTimeblock) return
    this.setState({ taskDrawer: true, taskDate: new Date() })    
  }

  /*
    pushing task in allTasks array 
    
  */
  createTask = () => {
    
    this.setState(({ taskHeader, taskDescr, taskDate, allTasks }) => {
      const date = new Date(taskDate)
      const taskYear = date.getFullYear()
      const taskMonth = date.getMonth() + 1
      const taskDay = date.getDate()
      
      const task = {
        date:         `${date}`,
        header:       `${taskHeader}`,
        description:  `${taskDescr}`
      }

      const makeYear = () => {
        allTasks.push(
          [
            [
              [
                task
              ]
            ]
          ]
        )

        allTasks.sort((year, nextYear) => {
          const a = new Date(year[0][0].date).getFullYear()
          const b = new Date(nextYear[0][0].date).getFullYear()
          return a - b
        })
      }
      
      const makeMonth = (yearIndex) => {
        allTasks[yearIndex].push(
          [
            [
              task
            ]
          ]
        )

        allTasks[yearIndex].sort((month, nextMonth) => {
          const a = new Date(month[0].date).getMonth() + 1
          const b = new Date(nextMonth[0].date).getMonth() + 1
          return b - a
        })
      }

      const makeDay = (yearIndex, monthIndex) => {
        allTasks[yearIndex][monthIndex].push([task])

        allTasks[yearIndex][monthIndex].sort((day, nextDay) => {
          const a = new Date(day.date).getFullYear()
          const b = new Date(nextDay.date).getFullYear()
          return b - a
        })
      }

      const pushTaskIn = (yearIndex, monthIndex, dayIndex) => {
        allTasks[yearIndex][monthIndex][dayIndex].push(task)

        allTasks[yearIndex][monthIndex][dayIndex].sort((day, nextDay) => {
          const a = Date.parse(day.date)
          const b = Date.parse(nextDay.date)
          return b - a
        })
      }

      const setTaskInfo = (year, month, day, index) => {
        if(index === 0) {
          if(allTasks.length === year) makeYear()

          else if(new Date(allTasks[year][month][day][0].date).getFullYear() === taskYear)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year + 1, month, day, index)
        }

        else if(index === 1) {
          if(allTasks[year].length === month) makeMonth(year)          

          else if(new Date(allTasks[year][month][day][0].date).getMonth() + 1 === taskMonth) 
            setTaskInfo(year, month, day, index + 1)
            
          else setTaskInfo( year, month + 1, day, index)
        }

        else if(index === 2) {
          if(allTasks[year][month].length === day) makeDay(year, month) 

          else if(new Date(allTasks[year][month][day][0].date).getDate() === taskDay)
            setTaskInfo(year, month, day, index + 1)

          else setTaskInfo(year, month, day + 1, index)
        }
        
        else if(index === 3) pushTaskIn(year, month, day)
      }

      setTaskInfo(0, 0, 0, 0)

      return { allTasks, taskDrawer: false }
    })
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
      taskHeader, taskDescr, taskDate
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
            <Year mode={mode} months={months} key={i} pos={i} />
          )}
        </div> 

        <TaskDrawer 
          taskDrawer={taskDrawer}
          createTask={this.createTask}
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