import React from 'react'
import { withStyles } from '@material-ui/core'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import CalendarToday from '@material-ui/icons/CalendarToday'
import AccessTime from '@material-ui/icons/AccessTime'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  date: {
    width: '70%',
  },

  datePicker: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '70px',
  },
})

class DatePicker extends React.PureComponent {
  render() {
    const { classes, setTaskDate, date } = this.props
    
    return (
      <div className={classes.datePicker}>
        <Typography variant='subheading'>
          Pick Date
        </Typography>

        <DateTimePicker
          className={classes.date}
          leftArrowIcon={<ArrowBackIos/>}
          rightArrowIcon={<ArrowForwardIos/>}
          dateRangeIcon={<CalendarToday/>}
          timeIcon={<AccessTime/>}
          autoOk
          minDateMessage={false}
          showTodayButton
          animateYearScrolling
          invalidLabel={'invalid date'}
          disablePast
          value={date}
          onChange={setTaskDate}
        />
      </div>
    )
  }
}

export default withStyles(styles)(DatePicker)