import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function DatePicker(props) {
    // The first commit of Material-UI
    const { date, dateChanged } = props;
    const [selectedDate, setSelectedDate] = useState(date);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        dateChanged(date);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date"
                    format="MM/DD/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                        style: {
                            color: '#fff'
                        }
                    }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            borderBottom: '1px solid #fff'
                        }
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}