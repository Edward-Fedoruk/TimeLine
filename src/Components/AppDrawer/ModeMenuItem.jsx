import React from 'react'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  timeMode: {
    display: 'flex', 
    alignItems: 'center', 
    height: '30px', 
    flexBasis: '100%',
    transition: 'all 1s linear',
    opacity: '0'
  },

  offsetLine: {
    height: '1px',
    width: '22px', 
    backgroundColor: 'gray',
    transition: 'all .25s linear'
  },
})

const ModeMenuItem = ({ 
  modeName, trsOpacityDelay, modeList, 
  LeftLineWidth, trsLeftLineDelay, classes,
  marginLeftLine, switchMode, currentMode
}) => (
  <div className={classes.timeMode} 
    style={{ 
      transitionDelay: trsOpacityDelay, 
      opacity: modeList ? '1' : '0'
    }}
    onClick={switchMode}
  >
    <div className={classes.offsetLine}
      style={{ 
        width: modeList ? `${LeftLineWidth}px` : '0px', 
        transitionDelay: trsLeftLineDelay,
        marginRight: `${marginLeftLine}px`
      }}       
    />
    
    <Button style={{ color: currentMode ? 'black' : 'gray' }}>{modeName}</Button>
  </div>
)

export default withStyles(styles)(ModeMenuItem)