import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Tooltip,
    IconButton,
} from '@mui/material'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Span } from 'app/components/Typography'
import { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

export default function AddUpdateAgentModal(props) {
    const { showModal, onClose, onSubmit,modalData,modalMode } = props
    const [formData, setFormData] = useState({ data: {} })
    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
    useEffect(() => {
        setFormData(modalData)
    }, [modalData])

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }

    const handleChange = (event) => {
        event.persist();
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    return (
        <Box>
            <Dialog
                open={showModal}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Agent{' '}
                    <Tooltip title="Delete Agent">
                        <IconButton
                            style={{
                                position: 'absolute',
                                right: '0',
                                top: 'o',
                            }}
                            onClick={onClose}
                        >
                            <Icon color="error">cancel_circle</Icon>
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add or update new agent
                    </DialogContentText>
                    <div style={{ width: '500px' }}>
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={() => null}
                        >
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextField
                                        type="text"
                                        name="name"
                                        id="agent-name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'agent name is required',
                                        ]}
                                        label="Agent name"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 80',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="os"
                                        id="agent-OS"
                                        value={formData.os || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'agent target OS is required',
                                        ]}
                                        label="Agent target OS"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 50',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="ip"
                                        id="agent-ip"
                                        value={formData.ip || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'agent ip is required',
                                        ]}
                                        label="Agent ip"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 40',
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    gap:'1rem'
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Submit
                                    </Span>
                                </Button>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={onClose}
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Cancel
                                    </Span>
                                </Button>
                            </div>
                        </ValidatorForm>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
