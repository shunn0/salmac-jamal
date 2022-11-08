import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
    Tooltip,
    Button,
    LinearProgress,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Span } from 'app/components/Typography'
import {
    getScriptList,
    getScriptListReset,
} from 'app/redux/actions/ScriptAction'
import {
    getAttackFxList,
    getAttackFxListReset,
    doAttackFxAction,
    deleteAttackFx,
    doAttackFxActionReset,
    getAttackFxById,
    getAttackFxReset,
    getAttackFxCategories,
    getAttackFxCategoriesReset,
} from 'app/redux/actions/AttackFxAction'
import AddUpdateAttackfxModal from './modal/AddUpdateAttackfxModal'
import ConfirmDialog from '../scripts/modal/confirm-dialog'
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

const AttackFxList = () => {
    const loading = useSelector((state) => state.attackFxReducer.loading)
    const scriptListResponse = useSelector(
        (state) => state.scriptReducer.scriptListResponse
    )
    const attackFxListResponse = useSelector(
        (state) => state.attackFxReducer.attackFxListResponse
    )
    const doAttackFxActionResponse = useSelector(
        (state) => state.attackFxReducer.doAttackFxActionResponse
    )
    const attackFxResponse = useSelector(
        (state) => state.attackFxReducer.attackFxResponse
    )
    const attackFxCategoriesResponse = useSelector(
        (state) => state.attackFxReducer.attackFxCategoriesResponse
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
    const [tecniqueList, setTecniqueList] = useState([])
    const [categories, setcategories] = useState([])
    const [progress, setProgress] = useState(0)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [scriptList, setScriptList] = useState([])
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
        console.log(attackFxListResponse)
        if (!attackFxListResponse) {
            return
        }
        if (
            attackFxListResponse &&
            attackFxListResponse.status === 'ok' &&
            attackFxListResponse.data.length > 0
        ) {
            setTecniqueList(attackFxListResponse.data)
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
        if (!doAttackFxActionResponse) {
            return
        }
        if (
            doAttackFxActionResponse &&
            doAttackFxActionResponse.status === 'ok'
        ) {
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg: 'Operation Success',
                type: 'success',
            })
            dispatch(getAttackFxListReset())
            dispatch(getAttackFxList())
            onCloseModal()
        } else if (
            doAttackFxActionResponse &&
            doAttackFxActionResponse.status === 'error'
        ) {
            console.log(doAttackFxActionResponse)
            setSnackBarState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
                snackbarMsg:
                    doAttackFxActionResponse.data &&
                    doAttackFxActionResponse.data.message
                        ? doAttackFxActionResponse.data.message
                        : 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [doAttackFxActionResponse])
    useEffect(() => {
        if (!attackFxResponse) {
            return
        }
        if (attackFxResponse && attackFxResponse.status === 'ok') {
            setModalData(attackFxResponse.data)
            setShowModal(true)
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

    const getCommonRow = (label, align) => {
        return (
            <Tooltip title={label}>
                <TableCell align={align || 'center'}>{label}</TableCell>
            </Tooltip>
        )
    }
    const onAddUpdateShowModal = (data, type) => {
        if (data && data.id && type) {
            setModalMode(type)
            dispatch(getAttackFxReset())
            dispatch(getAttackFxById(data.id))
        } else {
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
            dispatch(doAttackFxActionReset())
            dispatch(deleteAttackFx(modalData.id))
            onCloseModal()
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
                    routeSegments={[{ name: 'ATT&CK Framework', path: '/' }]}
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
                            Add New Technique
                        </Span>
                    </Button>
                </div>
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Code</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Script Id</TableCell>
                                <TableCell align="center">
                                    Script Name
                                </TableCell>
                                <TableCell align="center">
                                    Remedy Script Id
                                </TableCell>
                                <TableCell align="center">
                                    Remedy Script Name
                                </TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tecniqueList.map((row) => (
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
                                        {row.code}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.scriptId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.scriptName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.remedyScriptId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.remedyScriptName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status}
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
            {(modalMode === 'EDIT' && modalData && showModal) ||
            (modalMode === 'NEW' && showModal) ? (
                <AddUpdateAttackfxModal
                    showModal={showModal}
                    onClose={onCloseModal}
                    onSubmit={onAddUpdate}
                    modalData={modalData || null}
                    modalMode={modalMode || 'NEW'}
                    attackFxCategoriesResponse={attackFxCategoriesResponse}
                    scriptListResponse={scriptListResponse}
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
            {loading ? (
                <div className="hover-custom ">
                    <CircularProgress className="progress" />{' '}
                </div>
            ) : (
                ''
            )}
        </Container>
    )
}

export default AttackFxList
