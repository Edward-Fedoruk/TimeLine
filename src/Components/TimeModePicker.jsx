import React from 'react'
import { withStyles } from '@material-ui/core'


const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    position: 'absolute',
    flexWrap: 'wrap',
    // height: '102px',
    height: '0px',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    transition: 'all 1s linear'
  },

  line: {
    position: 'absolute',
    width: '1px',
    height: '100%',
    backgroundColor: 'gray',
    transition: 'all 1s'
  },

  timeMode: {
    display: 'flex', 
    alignItems: 'center', 
    height: '30px', 
    flexBasis: '100%',
    transition: 'all 1s',
    opacity: '0'
  },

  offsetLine: {
    height: '1px',
    width: '22px', 
    backgroundColor: 'gray',
    transition: 'all .25s'
  },
})


const TimeModePicker = ({ classes, testState }) => (
  <div className={classes.wrapper} style={{ height: testState ? '102px' : '0px' }}>
    <div className={classes.line} style={{ opacity: testState ? '1' : '0', transitionDelay: '.3s' }}></div>

    <div className={classes.timeMode} style={{  transitionDelay: '.15s', opacity: testState ? '1' : '0' }}>
      <div style={{ width: testState ? '22px' : '0px' }} className={classes.offsetLine}></div>Years
    </div>

    <div className={classes.timeMode} style={{  transitionDelay: '.4s', opacity: testState ? '1' : '0' }}>
      <div style={{ transitionDelay: '.5s', marginRight: '4px', width: testState ? '18px' : '0px' }} className={classes.offsetLine}></div>Year
    </div>

    <div className={classes.timeMode} style={{ transitionDelay: '.65s', opacity: testState ? '1' : '0' }}>
      <div className={classes.offsetLine} style={{ transitionDelay: '.75s', width: testState ? '14px' : '0px', marginRight: '8px'  }}></div>Month
    </div>

    <div className={classes.timeMode} style={{ transitionDelay: '.9s', height: '25px', opacity: testState ? '1' : '0'  }}>
      <div className={classes.offsetLine} style={{ transitionDelay: '1s', width: testState ? '10px' : '0px', marginRight: '12px' }}></div>Day
    </div>
  </div>
)


export default withStyles(styles)(TimeModePicker)