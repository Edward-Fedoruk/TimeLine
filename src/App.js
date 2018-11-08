import React from 'react'
import TopBar from './Components/TopBar'
import TimeLine from './Components/TimeLine/TimeLine'
import AppDrawer from './Components/AppDrawer/AppDrawer'

class App extends React.Component {
  state = {
    appDrawer: false,
    mode: 0
  }

  switchMode = mode => () => this.setState({ mode })

  toggleAppMenu = () => this.setState({ appDrawer: !this.state.appDrawer })

  render() {
    const { appDrawer, mode } = this.state
    return (
      <React.Fragment>
        
        <TopBar 
          toggleAppMenu={this.toggleAppMenu}
          currentModeIndex={mode}
        />
          
        <AppDrawer 
          switchMode={this.switchMode}
          toggleAppMenu={this.toggleAppMenu}
          appDrawer={appDrawer}
          mode={mode}
        />

        <TimeLine mode={mode} />
      
      </React.Fragment>
    )
  }
} 

export default App