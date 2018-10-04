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
    this.setState({ taskDrawer: true })    
  }

  /*
    pushing task in allTasks array 
    
  */
  createTask = () => {
    
    this.setState(({ taskHeader, taskDescr, taskDate }) => {
      
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

        {/* <button onClick={() => this.setState({mode: mode + 1})}>+</button> */}

        <div 
          className={classes.line}
          onClick={this.openTaskMenu}
          data-timeBlock="true"
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