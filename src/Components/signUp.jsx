import React from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
  paper: {
    width: '500px',
    minHeight: '400px',
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px 20px 0 20px'
  },

  textField: {
    width: '100%'
  },

  signIn: {
    margin: '20px 0',

  }
})

class signUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  onSubmit = e => {
    e.preventDefault()
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <form onSubmit={this.onSubmit}>

            <Typography 
              variant="headline" 
              align="center" 
              component="h1"
            >
              Sign up to Time Line or <Link to='/app'>log in</Link>
            </Typography>

            <TextField
              label="Name"
              placeholder="e.g., Landi Carl"
              margin="normal"
              autoFocus	
              onChange={this.onChange('name')}
              className={classes.textField}
            />

            <TextField
              label="Email"
              placeholder="e.g., carl@cloud.ci"
              margin="normal"
              type="email"
              onChange={this.onChange('email')}
              className={classes.textField}
            />

            <TextField
              label="Password"
              placeholder="e.g., *******"
              margin="normal"
              type="password"
              onChange={this.onChange('password')}
              className={classes.textField}
            />

            <TextField
              label="Confirm password"
              placeholder="e.g., *******"
              margin="normal"
              type="password"
              onChange={this.onChange('confirmPassword')}
              className={classes.textField}
            />

            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit"
              className={classes.signIn}
            >
              Create New Account
            </Button>

          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(signUp)