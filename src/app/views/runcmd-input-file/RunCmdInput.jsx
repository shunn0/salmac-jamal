import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import {
    LinearProgress,
    CircularProgress,
    Box,
    Typography,
    Button,
    ListItem,
    Grid,
    Snackbar,
    Alert,
    Icon,
    Card,
} from '@mui/material'
import { Span } from 'app/components/Typography'
import {
    runScriptFromFile,
    runScriptFromFileReset,
    getAvailableFileOnOs,
    getAvailableFileOnOsReset,
} from '../../redux/actions/RunCommandActions'
import { SimpleCard } from 'app/components'
//import UploadService from "../services/upload-files.service";

export const RunCmdInput = (props) => {
    const { agentData } = props
    const loading = useSelector((state) => state.runCommandReducer.loading)
    const fileUploadResponse = useSelector(
        (state) => state.runCommandReducer.fileUploadResponse
    )
    const availableFileOnOsResponse = useSelector(
        (state) => state.runCommandReducer.availableFileOnOsResponse
    )
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackbarMsg: '',
        type: 'success',
    })
    const { vertical, horizontal, open, snackbarMsg, type } = snackBarState
    const [availableOsFile, setAvailableOsFile] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')
    const [executeCmdList, setExecuteCmdList] = useState([])
    const [isError, setIsError] = useState(false)
    const [fileInfos, setFileInfos] = useState([])

    function snackbarClose() {
        setSnackBarState({ ...snackBarState, open: false })
    }
    const snackbarOpen = (newState) => () => {
        setSnackBarState({ open: true, ...newState })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if (agentData.os) {
            dispatch(getAvailableFileOnOsReset())
            dispatch(getAvailableFileOnOs(agentData.os))
        }
    }, [agentData])
    useEffect(() => {
        if (!availableFileOnOsResponse) {
            return
        }
        if (
            availableFileOnOsResponse &&
            availableFileOnOsResponse.status === 'ok' &&
            availableFileOnOsResponse.data.length > 0
        ) {
            setAvailableOsFile(availableFileOnOsResponse.data)
        } else if (
            availableFileOnOsResponse &&
            availableFileOnOsResponse.status === 'error'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg: 'something wrong!!!',
                type: 'error',
            })
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [availableFileOnOsResponse])
    useEffect(() => {
        if (!fileUploadResponse) {
            return
        }
        if (
            fileUploadResponse &&
            fileUploadResponse.status === 'ok' &&
            fileUploadResponse.data.length > 0
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg: 'Command Run Successfully!!!',
                type: 'success',
            })
            setExecuteCmdList(fileUploadResponse.data)
        } else if (
            fileUploadResponse &&
            fileUploadResponse.status === 'error'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg: 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [fileUploadResponse])
    const selectFile = (event) => {
        setSelectedFiles(event.target.files)
    }
    const loadAvalableDropDow = () => {
        const options = []
        availableOsFile.map((data, index) => {
            options.push({ value: data.id, label: data.name })
        })
        return options
    }
    const runScriptFromUploadedFile = () => {
        let currentFile = selectedFiles[0]
        setCurrentFile(currentFile)
        setProgress(0)
        const formData = new FormData()
        formData.append('file', selectedFiles[0], selectedFiles[0].name)
        dispatch(runScriptFromFileReset())
        dispatch(
            runScriptFromFile(
                formData,
                (event) => {
                    setProgress(Math.round((100 * event.loaded) / event.total))
                },
                agentData.ip
                    ? 'http://' + agentData.ip
                    : 'http://34.125.135.255:8080'
            )
        )
    }
    const getFileDetails = (selectedFiles) => {
        return (
            <div>
                <h5>File Details:</h5>
                <p>File Name: {selectedFiles.name}</p>
                <p>File Type: {selectedFiles.type}</p>
            </div>
        )
    }

    return (
        <Grid container spacing={6}>
            {loading && !props.isInputFile ? (
                <div className="hover-custom ">
                    <CircularProgress className="progress" />{' '}
                </div>
            ) : (
                ''
            )}

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <SimpleCard title="Run From Local File">
                    {currentFile && (
                        <Box
                            className="mb25"
                            display="flex"
                            alignItems="center"
                        >
                            <Box width="100%" mr={1}>
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                />
                            </Box>
                            <Box minWidth={35}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >{`${progress}%`}</Typography>
                            </Box>
                        </Box>
                    )}

                    <Box mt={2} mb={2}>
                        <label htmlFor="btn-upload">
                            <input
                                id="btn-upload"
                                name="btn-upload"
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
                    </Box>
                    <Box mt={2} mb={2}>
                        <div className="file-name">
                            {selectedFiles && selectedFiles.length > 0
                                ? getFileDetails(selectedFiles[0])
                                : null}
                        </div>
                    </Box>
                    <hr />
                    <Box minWidth={35} mt={2}>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            disabled={!selectedFiles}
                            onClick={runScriptFromUploadedFile}
                        >
                            Run Script From File
                        </Button>
                    </Box>
                </SimpleCard>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <SimpleCard title="Available Files">
                    <Select options={loadAvalableDropDow()} />
                    <Box mt={2} mb={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            style={{ float: 'right' }}
                        >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                Execute
                            </Span>
                        </Button>
                    </Box>
                </SimpleCard>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6" className="list-header">
                    Response
                </Typography>
                <hr />
                <ul className="list-group">
                    {executeCmdList &&
                        executeCmdList.map((cmd, index) => (
                            <ListItem divider key={index}>
                                <p>{cmd}</p>
                            </ListItem>
                        ))}
                </ul>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={snackbarClose}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={snackbarClose}
                    severity={type}
                    sx={{ width: '100%' }}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Grid>
    )
}
export default RunCmdInput
