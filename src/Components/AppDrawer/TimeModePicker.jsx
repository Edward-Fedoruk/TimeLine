import React from 'react'
import { withStyles } from '@material-ui/core'
import ModeMenuItem from "./ModeMenuItem"
import { Transition } from 'react-transition-group';


const styles = (theme) => ({
  wrapper: {
    position: 'absolute',
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
    transition: 'all 1s linear'
  },

  TimeModePicker: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    height: '130px',
    transition: 'height .8s linear'
  }
})

const TimeModePicker = ({ classes, modeList, switchMode, mode }) => (
  <Transition
    in={!modeList}
    timeout={1500}
  >
    {state =>
      <div 
        className={classes.TimeModePicker}
        style={{ height: state === "entered" ? '0' : '130px' }} 
      >
        <div className={classes.wrapper}>
          <div className={classes.line} 
            style={{
              height: modeList ? '105px' : '0px', 
              opacity: modeList ? '1' : '0', 
              transitionDelay: '.3s' 
            }}
          />
          
          <ModeMenuItem 
            modeName={"Years"}
            trsDelay={".15s"}
            modeList={modeList}
            LeftLineWidth={22}
            trsLeftLineDelay={".25s"}
            marginLeftLine={0}
            switchMode={switchMode(3)}
            currentMode={mode === 3}
          />

          <ModeMenuItem 
            modeName={"Year"}
            trsOpacityDelay={".4s"}
            modeList={modeList}
            LeftLineWidth={18}
            trsLeftLineDelay={".5s"}
            marginLeftLine={4}
            switchMode={switchMode(2)}
            currentMode={mode === 2}
          />

          <ModeMenuItem 
            modeName={"Month"}
            trsOpacityDelay={".65s"}
            modeList={modeList}
            LeftLineWidth={14}
            trsLeftLineDelay={".75s"}
            marginLeftLine={8}
            switchMode={switchMode(1)}
            currentMode={mode === 1}
          />

          <ModeMenuItem 
            modeName={"Day"}
            trsOpacityDelay={".9s"}
            modeList={modeList}
            LeftLineWidth={10}
            trsLeftLineDelay={"1s"}
            marginLeftLine={9}
            switchMode={switchMode(0)}
            currentMode={mode === 0}
          />
        </div>
      </div>}
  </Transition>
)


export default withStyles(styles)(TimeModePicker)