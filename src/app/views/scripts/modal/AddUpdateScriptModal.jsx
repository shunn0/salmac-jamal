import {
    Box,
    Button,
    Icon,
    Tooltip,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import {
    addEditScript,
    addEditScriptReset,
    getScriptById,
} from 'app/redux/actions/ScriptAction'

export default function AddUpdateScriptModal(props) {
    const { showModal, onClose, modalData, modalMode } = props
    const [formData, setFormData] = useState({})
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const loading = useSelector((state) => state.scriptReducer.loading)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    useEffect(() => {
        if (modalData && modalData.id && modalMode === 'EDIT') {
            setFormData(modalData)
        }
    }, [modalData])
    useEffect(() => {
        // reset form with user data
        reset(formData)
    }, [formData])

    const onSubmit = (data) => {
        if (!data) {
            return false
        }
        const scriptData = new FormData()
        console.log(formData)
        if (selectedFiles) {
            scriptData.append('file', selectedFiles[0], selectedFiles[0].name)
        }
        if (formData.id) {
            scriptData.append('scriptId', formData.id)
        }
        scriptData.append('name', data.name)
        scriptData.append('targetOS', data.targetOS)
        scriptData.append('scriptType', data.scriptType)
        scriptData.append('status', data.status)
        scriptData.append('purpose', data.purpose)
        scriptData.append('content', data.content)
        dispatch(addEditScriptReset())
        dispatch(
            addEditScript(scriptData, formData, formData.id ? 'put' : 'post')
        )
    }
    const selectFile = (event) => {
        setSelectedFiles(event.target.files)
    }
    const getFileDetails = (selectedFile) => {
        return (
            <div>
                <h5>File Details:</h5>
                <p>File Name: {selectedFile.name}</p>
                <p>File Type: {selectedFile.type}</p>
            </div>
        )
    }
    return (
        <Box>
            <Dialog
                open={showModal}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {modalMode === 'EDIT' ? 'Update Script' : 'New Script'}
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
                        <b>Add or update new script</b>
                    </DialogContentText>
                    <div style={{ width: '500px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box mt={2} mb={2}></Box>
                            <Box mt={2} mb={2}></Box>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="btn-upload"
                                    className="col-sm-4 col-form-label"
                                >
                                    <input
                                        id="btn-upload"
                                        name="file"
                                        {...register('file')}
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={selectFile}
                                    />
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span"
                                    >
                                        Choose Files
                                    </Button>
                                </label>
                                <div className="col-sm-8">
                                    <div className="file-name">
                                        {selectedFiles &&
                                        selectedFiles.length > 0
                                            ? getFileDetails(selectedFiles[0])
                                            : null}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="name"
                                    className="col-sm-4 form-label"
                                >
                                    Name
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name"
                                        {...register('name', {
                                            required: true,
                                            min: 2,
                                            maxLength: 100,
                                        })}
                                        aria-invalid={
                                            errors['name'] ? 'true' : 'false'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="targetOS"
                                    className="col-sm-4 form-label"
                                >
                                    Target Os
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('targetOS', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['scriptType']
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="Linux">Linux</option>
                                        <option value="Ubuntu">Ubuntu</option>
                                        <option value="Macintosh">
                                            Macintosh
                                        </option>
                                        <option value="Windows">Batch</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="scriptType"
                                    className="col-sm-4 form-label"
                                >
                                    Script Type
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('scriptType', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['scriptType']
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="Shell">Shell</option>
                                        <option value="Python">Python</option>
                                        <option value="Batch">Batch</option>
                                        <option value="Command">Command</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="status"
                                    className="col-sm-4 form-label"
                                >
                                    Sttus
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('status', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['status'] ? 'true' : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label
                                    htmlFor="purpose"
                                    className="col-sm-4 form-label"
                                >
                                    Purpose
                                </label>
                                <div className="col-sm-8">
                                    <textarea
                                        class="form-control"
                                        placeholder="Purpose"
                                        {...register('purpose', {
                                            required: false,
                                            min: 2,
                                            maxLength: 200,
                                        })}
                                        aria-invalid={
                                            errors['purpose'] ? 'true' : 'false'
                                        }
                                        rows="3"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="content"
                                    className="col-sm-4 form-label"
                                >
                                    Content
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Content"
                                        {...register('content', {
                                            required: false,
                                            min: 2,
                                            maxLength: 100,
                                        })}
                                        aria-invalid={
                                            errors['content'] ? 'true' : 'false'
                                        }
                                    />
                                </div>
                            </div>
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
                                    onClick={() => reset()}
                                    color="secondary"
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Reset
                                    </Span>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="inherit"
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
                        </form>

                        {loading ? (
                            <div className="hover-custom ">
                                <CircularProgress className="progress" />{' '}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
