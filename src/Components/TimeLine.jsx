import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Year from './Year'

const tasks = 
[
  [ 
    [
      [
        {
          date: '2018-09-17T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-17T15:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],

      [
        {
          date: '2018-09-18T16:41:00Z',
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
          date: '2018-09-24T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-24T17:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-24T18:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ],

      [
        {
          date: '2018-09-25T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-25T16:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-09-25T19:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        }
      ]
    ],

    [
      [
        {
          date: '2018-10-26T14:41:00Z',
          header: 'important task',
          description: 'a lot of text'
        },

        {
          date: '2018-10-26T16:41:00Z',
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
    mode: 0
  }

  initTasks = null

  componentDidMount() {
    // fetch date and set in state and global var
    this.initTasks = tasks
    this.setState({ allTasks: tasks })
  }

  render() {
    const { classes } = this.props
    const { allTasks, mode } = this.state
    return (
      <div className={classes.lineWrap}>
        <div className={classes.line}>
          {allTasks.map((months, i) =>
            <Year mode={mode} months={months} key={i} pos={i} />
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TimeLine)