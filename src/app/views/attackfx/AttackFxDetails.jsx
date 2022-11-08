import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    LinearProgress,
    CircularProgress,
    IconButton,
    Box,
    Typography,
    Button,
    ListItem,
    Grid,
    Snackbar,
    Alert,
    Icon,
    Card,
    useTheme,
    styled,
    Tooltip,
} from '@mui/material'
import { Span } from 'app/components/Typography'
import {
    runScriptFromFile,
    runScriptFromFileReset,
    getAvailableFileOnOs,
    getAvailableFileOnOsReset,
    runServerScript,
    runServerScriptReset,
} from '../../redux/actions/RunCommandActions'
import {
    getScriptList,
    getScriptListReset,
} from 'app/redux/actions/ScriptAction'
import {
    getAttackFxList,
    getAttackFxListReset,
    doAttackFxActionByScript,
    doAttackFxActionReset,
    getAttackFxById,
    getAttackFxReset,
    getAttackFxCategories,
    getAttackFxCategoriesReset,
} from 'app/redux/actions/AttackFxAction'
import { SimpleCard } from 'app/components'
//import UploadService from "../services/upload-files.service";
import Select from 'react-select'
const Small = styled('small')(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    cursor: 'pointer',
}))
export const AttackFxDetails = (props) => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const { agentData } = props
    const loading = useSelector((state) => state.attackFxReducer.loading)
    const attackFxCategoriesResponse = useSelector(
        (state) => state.attackFxReducer.attackFxCategoriesResponse
    )
    const attackFxListResponse = useSelector(
        (state) => state.attackFxReducer.attackFxListResponse
    )
    const attackFxResponse = useSelector(
        (state) => state.attackFxReducer.attackFxResponse
    )
    const doAttackFxActionResponse = useSelector(
        (state) => state.attackFxReducer.doAttackFxActionResponse
    )
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackbarMsg: '',
        type: 'success',
    })
    const { vertical, horizontal, open, snackbarMsg, type } = snackBarState
    const [techniqueResponse, setTechniqueResponse] = useState(null)
    const [techniqueOptions, setTechniqueOptions] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState(null)
    const [techniqueDetails, setTechniqueDetails] = useState(null)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [categories, setCategories] = useState([])
    const [tecniqueList, setTecniqueList] = useState([])
    function snackbarClose() {
        setSnackBarState({ ...snackBarState, open: false })
    }
    const snackbarOpen = (newState) => () => {
        setSnackBarState({ open: true, ...newState })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAttackFxListReset())
        dispatch(getAttackFxList())
        dispatch(getScriptListReset())
        dispatch(getScriptList())
        if (!attackFxCategoriesResponse) {
            dispatch(getAttackFxCategoriesReset())
            dispatch(getAttackFxCategories())
        }
    }, [])
    useEffect(() => {
        if (!attackFxCategoriesResponse) {
            return
        }
        if (
            attackFxCategoriesResponse &&
            attackFxCategoriesResponse.status === 'ok' &&
            attackFxCategoriesResponse.data.length > 0
        ) {
            loadAvalableCategoryOptions(attackFxCategoriesResponse.data)
        } else if (
            attackFxCategoriesResponse &&
            attackFxCategoriesResponse.status === 'error'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                attackFxCategoriesResponse.data &&
                attackFxCategoriesResponse.data.message
                        ? attackFxCategoriesResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [attackFxCategoriesResponse])
    useEffect(() => {
        if (!attackFxListResponse) {
            return
        }
        if (
            attackFxListResponse &&
            attackFxListResponse.status === 'ok' &&
            attackFxListResponse.data.length > 0
        ) {
            loadAvalableTechniqueOptions(attackFxListResponse.data)
        } else if (
            attackFxListResponse &&
            attackFxListResponse.status === 'error'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    attackFxListResponse.data &&
                    attackFxListResponse.data.message
                        ? attackFxListResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [attackFxListResponse])
    useEffect(() => {
        if (!attackFxResponse) {
            return
        }
        if (attackFxResponse && attackFxResponse.status === 'ok') {
            setTechniqueDetails(attackFxResponse.data)
        } else if (attackFxResponse && attackFxResponse.status === 'error') {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    attackFxResponse.data && attackFxResponse.data.message
                        ? attackFxResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [attackFxResponse])
    useEffect(() => {
        if (!doAttackFxActionResponse) {
            return
        }
        if (doAttackFxActionResponse && doAttackFxActionResponse.status === 'ok') {
            setTechniqueDetails(doAttackFxActionResponse.data)
        } else if (doAttackFxActionResponse && doAttackFxActionResponse.status === 'error') {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                doAttackFxActionResponse.data && doAttackFxActionResponse.data.message
                        ? doAttackFxActionResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [doAttackFxActionResponse])
    const loadAvalableCategoryOptions = (data) => {
        const options = []
        options.push({ value: '', label: 'Select' })
        if (data && data.length > 0) {
            data.map((data, index) => {
                return options.push({ value: data.key, label: data.value })
            })
        }
        setCategories(options)
    }
    const loadAvalableTechniqueOptions = (data) => {
        const options = []
        //options.push({ value: '', label: 'Select' })
        if (data && data.length > 0) {
            data.map((data, index) => {
                return options.push({
                    value: data.id,
                    label: data.name,
                    category: data.category,
                })
            })
        }
        setTecniqueList(options)
        setTechniqueResponse(options)
    }
    const onCategoryChange = (selectedOptions) => {
        setCategoryOptions(selectedOptions)
        if (
            selectedOptions &&
            selectedOptions.value &&
            techniqueResponse.length
        ) {
            const techList = techniqueResponse.filter((obj) => {
                return obj.category === selectedOptions.value
            })
            setTecniqueList(techList)
        } else {
            setTecniqueList(techniqueResponse)
        }
    }
    const onTechniqueChange = (selectedOptions) => {
        setTechniqueOptions(selectedOptions)
    }
    const getTechiniqueDetails = () => {
        if (techniqueOptions) {
            const data = {
                serverId: agentData.id,
                techniqueId: parseInt(techniqueOptions.value),
            }
            dispatch(getAttackFxReset())
            dispatch(
                getAttackFxById(
                    null,
                    'attack?serverId=' +
                        agentData.id +
                        '&techniqueId=' +
                        techniqueOptions.value
                )
            )
        }
    }
    const attackWithScript = () => {
        if (
            techniqueDetails &&
            techniqueDetails.scriptId &&
            techniqueDetails.techniqueId
        ) {
            const url =
                '/attackfx/attack?serverId=' +
                agentData.id +
                '&techniqueId=' +
                techniqueDetails.techniqueId
            dispatch(doAttackFxActionReset())
            dispatch(doAttackFxActionByScript(url))
        }
    }
    const attackWithRemidate = () => {
        if (
            techniqueDetails &&
            techniqueDetails.remedyScriptId &&
            techniqueDetails.techniqueId
        ) {
            const url =
                '/attackfx/attack/remediate?serverId=' +
                agentData.id +
                '&techniqueId=' +
                techniqueDetails.techniqueId
            dispatch(doAttackFxActionReset())
            dispatch(doAttackFxActionByScript(url))
        }
    }
    return (
        <Grid container spacing={6}>
            {loading ? (
                <div className="hover-custom">
                    <CircularProgress className="progress" />
                </div>
            ) : (
                ''
            )}
            <Box mt={2} mb={2}></Box>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                <Grid item lg={3} md={3} sm={3} xs={3} spacing={6}>
                    <Select
                        name="category"
                        value={categoryOptions}
                        onChange={onCategoryChange}
                        options={categories}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3} sx={{ mt: 2 }}>
                    <Select
                        name="techniqueId"
                        value={techniqueOptions}
                        onChange={onTechniqueChange}
                        options={tecniqueList}
                    ></Select>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={3} sx={{ mt: 2 }}>
                    <Button
                        color="primary"
                        variant="contained"
                        type="button"
                        style={{ float: 'right' }}
                        onClick={getTechiniqueDetails}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Load Technique Details
                        </Span>
                    </Button>
                </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6" className="list-header">
                    Technique Details
                </Typography>
                <hr />
                <ul className="list-group">
                    {techniqueDetails ? (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Server:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>
                                            {techniqueDetails.serverName}
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Technique:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>{techniqueDetails.name}</label>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Code:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>{techniqueDetails.code}</label>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Category:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>
                                            {techniqueDetails.category}
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Script:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {techniqueDetails.scriptId ? (
                                            <Tooltip title="Click to run script">
                                                <Small
                                                    bgcolor={bgPrimary}
                                                    onClick={attackWithScript}
                                                >
                                                    {
                                                        techniqueDetails.scriptName
                                                    }
                                                </Small>
                                            </Tooltip>
                                        ) : (
                                            <label>
                                                {techniqueDetails.scriptName}
                                            </label>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Remedy Script:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {techniqueDetails.remedyScriptId ? (
                                            <Tooltip title="Click to run script">
                                                <Small
                                                    bgcolor={bgPrimary}
                                                    onClick={attackWithRemidate}
                                                >
                                                    {
                                                        techniqueDetails.remedyScriptName
                                                    }
                                                </Small>
                                            </Tooltip>
                                        ) : (
                                            <label>
                                                {techniqueDetails.remedyScriptName ||
                                                    ''}
                                            </label>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Status:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {techniqueDetails.status ===
                                        'Active' ? (
                                            <label
                                                style={{
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {techniqueDetails.status}
                                            </label>
                                        ) : techniqueDetails.status ===
                                          'Inactive' ? (
                                            <label
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {techniqueDetails.status}
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Positive:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {techniqueDetails.positive === true ? (
                                            <label
                                                style={{
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Yes
                                            </label>
                                        ) : techniqueDetails.positive ===
                                          false ? (
                                            <label
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                No
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Remediated:</label>{' '}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {techniqueDetails.remediated ===
                                        true ? (
                                            <label
                                                style={{
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Yes
                                            </label>
                                        ) : techniqueDetails.remediated ===
                                          false ? (
                                            <label
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                No
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Last Output Text:</label>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>
                                            {techniqueDetails.lastOutputText}
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    direction="row"
                                    container
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid item xs={4}>
                                        <label>Last Execution Time:</label>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <label>
                                            {techniqueDetails.lastExecutionTime}
                                        </label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        ''
                    )}
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
export default AttackFxDetails
