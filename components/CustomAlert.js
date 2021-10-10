
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Component, useState } from 'react';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class CustomAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            severity: props.severity,
            message: props.message
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ open: false })
    }
    handleOpen(x) {
        this.setState({ open: true, severity: x.severity, message: x.message })
    }
    render() {
        return (

            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Alert onClose={this.handleClose} severity={this.state.severity}>{this.state.message}</Alert>
            </Snackbar>
        )
    }
}