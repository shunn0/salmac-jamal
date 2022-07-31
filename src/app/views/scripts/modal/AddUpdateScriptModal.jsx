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
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Span } from 'app/components/Typography'
import { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {
    addEditScript,
    addEditScriptReset,
} from 'app/redux/actions/ScriptAction'

export default function AddUpdateScriptModal(props) {
    const { showModal, onClose, onSubmit, modalData, modalMode } = props
    const [formData, setFormData] = useState({})
    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
    const loading = useSelector((state) => state.scriptReducer.loading)
    const addEditScriptResponse = useSelector(
        (state) => state.scriptReducer.addEditScriptResponse
    )
    const dispatch = useDispatch()
    useEffect(() => {
        if (modalData) {
            setFormData(modalData)
        }
    }, [modalData])

    const handleSubmit = (event) => {
        console.log(formData)
        // console.log(event);
        dispatch(addEditScriptReset())
        dispatch(addEditScript(formData, formData.id ? 'put' : 'post'))
    }
    const handleChange = (event) => {
        event.persist()
        const data = { ...formData }
        data[event.target.name] = event.target.value
        setFormData(data)
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
                        Add or update new script
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
                                        id="script-name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'script name is required',
                                        ]}
                                        label="Script name (Min length 4, Max length 80)"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 80',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="targetOS"
                                        id="script-targetOS"
                                        value={formData.targetOS || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'script target OS is required',
                                        ]}
                                        label="Script target OS (Min length 4, Max length 50)"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 50',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="purpose"
                                        id="script-purpose"
                                        value={formData.purpose || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'script purpose is required',
                                        ]}
                                        label="Script purpose (Min length 4, Max length 200)"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 200',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="content"
                                        id="script-content"
                                        value={formData.content || ''}
                                        onChange={handleChange}
                                        errorMessages={[
                                            'script content is required',
                                        ]}
                                        label="Script content (Min length 4, Max length 200)"
                                        validators={[
                                            'required',
                                            'minStringLength: 4',
                                            'maxStringLength: 200',
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    gap: '1rem',
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
