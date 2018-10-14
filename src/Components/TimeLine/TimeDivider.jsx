import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  timeSeparator: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '1px',
    background: 'rgba(238, 238, 238, .4)',
    left: '-75vw',
    transition: 'all 1.5s',
    opacity: '0',
    transform: 'rotate(180deg)'
  },

  time: {
    position: 'absolute',
    right: '25px',
    fontSize: '14px',
    transform: 'rotate(180deg)',
    color: theme.palette.secondary.main,
    lineHeight: '2',
    fontSize: '13px'
  },
})

class TimeDivider extends React.Component {

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
      },

      { year: 'numeric' },

      { year: 'numeric' }
    ]

    const { mode, date } = this.props
    return new Date(date).toLocaleString('en-us', options[mode])
  }
  
  render() {
    const { classes, fadeIn } = this.props
    return (
      <div style={{ opacity: `${fadeIn ? 1 : 0}`  }} className={classes.timeSeparator}>
        <span className={classes.time}>{ this.convertDate() }</span>
      </div>
    )
  }
}

export default withStyles(styles)(TimeDivider)