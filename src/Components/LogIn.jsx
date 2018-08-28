import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import formStyles  from './formStyles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


class LogIn extends React.Component {
  state = {
    email: '',
    password: ''
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
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            onError={errors => console.log(errors)}
          >

            <Typography 
              variant="headline" 
              align="center" 
              component="h1"
            >
              Log in to TimeLine account or <Link to='/'>Sign up</Link>
            </Typography>

            <TextValidator
              label="Email"
              name="email"
              placeholder="e.g., carl@cloud.ci"
              onChange={this.onChange('email')}
              className={classes.textField}
              value={this.state.email}
              margin="normal"
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <TextValidator
              label="Password"
              type="password"
              placeholder="e.g., *******"
              onChange={this.onChange('password')}
              className={classes.textField}
              value={this.state.password}
              margin="normal"
              name="password"
              validators={['required', 'minStringLength:6', 'maxStringLength:16']}
              errorMessages={['this field is required', 'password must contain at least 6 characters', 'password must contain no more then 16 characters']}
            />

            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit"
              className={classes.signIn}
            >
              Log in 
            </Button>

          </ValidatorForm>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(formStyles)(LogIn)