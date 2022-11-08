import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    CircularProgress,
    Tooltip,
    Snackbar,
    Alert,
} from '@mui/material'
import { Span } from 'app/components/Typography'
import { Breadcrumb, SimpleCard } from 'app/components'
import AddUpdateScriptModal from './modal/AddUpdateScriptModal'
import {
    getScriptList,
    getScriptListReset,
    deleteScript,
    addEditScriptReset,
    getScriptById,
} from 'app/redux/actions/ScriptAction'
import ConfirmDialog from './modal/confirm-dialog'
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const ScriptList = () => {
    const loading = useSelector((state) => state.scriptReducer.loading)
    const scriptListResponse = useSelector(
        (state) => state.scriptReducer.scriptListResponse
    )
    const addEditScriptResponse = useSelector(
        (state) => state.scriptReducer.addEditScriptResponse
    )
    const getScriptResponse = useSelector(
        (state) => state.scriptReducer.getScriptResponse
    )
    const dispatch = useDispatch()
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackbarMsg: '',
        type: 'success',
    })
    const { vertical, horizontal, open, snackbarMsg, type } = snackBarState
    const [showModal, setShowModal] = React.useState(false)
    const [showConfirmModal, setShowConfirmModal] = React.useState(false)
    const [modalData, setModalData] = React.useState(null)
    const [modalMode, setModalMode] = React.useState(null)
    const [progress, setProgress] = useState(0)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [scriptList, setScriptList] = useState([])

    useEffect(() => {
        dispatch(getScriptListReset())
        dispatch(getScriptList())
    }, [])
    useEffect(() => {
        if (!scriptListResponse) {
            return
        }
        if (
            scriptListResponse &&
            scriptListResponse.status === 'ok' &&
            scriptListResponse.data.length > 0
        ) {
            setScriptList(scriptListResponse.data)
        } else if (
            scriptListResponse &&
            scriptListResponse.status === 'error'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    scriptListResponse.data && scriptListResponse.data.message
                        ? scriptListResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [scriptListResponse])
    useEffect(() => {
        if (!addEditScriptResponse) {
            return
        }
        if (addEditScriptResponse && addEditScriptResponse.status === 'ok') {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg: 'Operation Success',
                type: 'success',
            })
            dispatch(getScriptListReset())
            dispatch(getScriptList())
            onCloseModal()
        } else if (
            addEditScriptResponse &&
            addEditScriptResponse.status === 'error'
        ) {
            console.log(addEditScriptResponse)
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    addEditScriptResponse.data &&
                    addEditScriptResponse.data.message
                        ? addEditScriptResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [addEditScriptResponse])
    useEffect(() => {
        if (!getScriptResponse) {
            return
        }
        if (getScriptResponse && getScriptResponse.status === 'ok') {
            setModalData(getScriptResponse.data)
            setShowModal(true)
        } else if (getScriptResponse && getScriptResponse.status === 'error') {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    getScriptResponse.data && getScriptResponse.data.message
                        ? getScriptResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [getScriptResponse])
    const onAddUpdateShowModal = (data, type) => {
        if (data && data.id && type) {
            setModalMode(type)
            dispatch(addEditScriptReset())
            dispatch(getScriptById(data.id))
        }else{
            setModalMode(type)
            setShowModal(true)
        }
    }
    const onCloseModal = () => {
        setShowModal(false)
        setShowConfirmModal(false)
        setModalMode(null)
        setModalData(null)
    }
    const onShowConfirmModal = (data, type) => {
        if (data) setModalData(data)
        if (type) setModalMode(type)
        setShowConfirmModal(true)
    }
    const onAddUpdate = () => {}
    const onScriptDelete = () => {
        if (modalData && modalData.id) {
            dispatch(addEditScriptReset())
            dispatch(deleteScript(modalData.id))
            onCloseModal();
        }
    }
    function snackbarClose() {
        setSnackBarState({ ...snackBarState, open: false })
    }
    const snackbarOpen = (newState) => () => {
        setSnackBarState({ open: true, ...newState })
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'List of Scripts', path: '/' }]}
                />
            </div>
            <SimpleCard>
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
                        type="button"
                        onClick={() => {
                            onAddUpdateShowModal(null, 'NEW')
                        }}
                    >
                        <Icon>add_circle</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add New Script
                        </Span>
                    </Button>
                </div>
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        {loading ? (
                            <div className="hover-custom ">
                                <CircularProgress className="progress" />{' '}
                            </div>
                        ) : (
                            ''
                        )}
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">
                                    Operating System&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Status&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Update Time
                                </TableCell>
                                <TableCell align="right">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scriptList.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.targetOS}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.lastUpdateTime}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Connect Agent">
                                            <IconButton
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    onAddUpdateShowModal(
                                                        row,
                                                        'EDIT'
                                                    )
                                                }}
                                            >
                                                <Icon color="primary">
                                                    edit
                                                </Icon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Connect Agent">
                                            <IconButton
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    onShowConfirmModal(row)
                                                }}
                                            >
                                                <Icon color="secondary">
                                                    delete
                                                </Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                    {/* <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={subscribarList.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                /> */}
                </Box>
            </SimpleCard>
            {(modalMode==="EDIT" && modalData && showModal) || (modalMode==="NEW" && showModal) ? (
                <AddUpdateScriptModal
                    showModal={showModal}
                    onClose={onCloseModal}
                    onSubmit={onAddUpdate}
                    modalData={modalData || null}
                    modalMode={modalMode || "NEW"}
                />
            ) : null}
            {showConfirmModal ? (
                <ConfirmDialog
                    showModal={showConfirmModal}
                    onClose={onCloseModal}
                    onConfirm={onScriptDelete}
                    modalData={modalData}
                />
            ) : null}
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
        </Container>
    )
}

export default ScriptList
