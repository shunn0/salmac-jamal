import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function ConfirmDialog(props) {
    const { showModal,onClose ,onConfirm } = props

    return (
        <Dialog
            open={showModal}
            keepMounted
            onClose={onClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
               Confirm
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   <b>Are you sure you wnat to delte this content?</b> 
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onConfirm} color="primary">
                    Ok
                </Button>

                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
