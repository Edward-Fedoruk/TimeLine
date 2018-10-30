import React from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  selectionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    overflow: 'scroll'
  },

  selectWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    marginTop: '70px'
  },

  grey: { 
    backgroundColor: '#E5E5E5',
  },

  circle: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginLeft: '42px',
    transition: 'border .2s linear',
    cursor: 'pointer'
  },

  yellow: {
    backgroundColor: '#FCFC2E',
  },

  chosenTask: {
    border: `2px solid ${theme.palette.primary.main}`
  }
})


const TaskPriority = ({ classes, priority, setTaskSettings }) => (
  <div className={classes.selectionsWrap}>
    <div className={classes.selectWrap}>
      <Typography variant='subheading'>Priority</Typography>

      <div 
        onClick={() => setTaskSettings("priority", 0)} 
        className={`
          ${classes.circle} 
          ${classes.grey} 
          ${priority === 0 && classes.chosenTask}
        `}
      />
      
      <div 
        onClick={() => setTaskSettings("priority", 1)} 
        className={`
          ${classes.circle} 
          ${classes.yellow}
          ${priority === 1 && classes.chosenTask}
        `}
      />

    </div>
  </div>
)

export default withStyles(styles)(TaskPriority)