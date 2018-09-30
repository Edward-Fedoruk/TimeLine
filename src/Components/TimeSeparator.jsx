import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  timeSeparator: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '2px',
    background: '#000',
    right: '-60vw',
  },

  time: {
    position: 'absolute',
    right: '10px',
    fontSize: '14px',
    transform: 'rotate(180deg)'
  },
})

class TimeSeparator extends React.Component {

  convertDate() {
    const options = [
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      },

      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },

      {
        year: 'numeric',
        month: 'long',
      },

      { year: 'numeric' }
    ]

    const { mode, date } = this.props
    return new Date(date).toLocaleString('en-us', options[mode])
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.timeSeparator}>
        <span className={classes.time}>{ this.convertDate() }</span>
      </div>
    )
  }
}

export default withStyles(styles)(TimeSeparator)