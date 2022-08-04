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
    LinearProgress,
    CircularProgress,
} from '@mui/material'
import { Span } from 'app/components/Typography'
import { Breadcrumb, SimpleCard } from 'app/components'
import AddUpdateScriptModal from './modal/AddUpdateScriptModal'
import {
    getScriptList,
    getScriptListReset,
} from 'app/redux/actions/ScriptAction'
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
    const dispatch = useDispatch()
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackbarMsg: '',
        type: 'success',
    })
    const [showModal, setShowModal] = React.useState(false)
    const [modalData, setModalData] = React.useState(null)
    const [modalMode, setModalMode] = React.useState('NEW')
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
                snackbarMsg: 'something wrong!!!',
                type: 'error',
            })
            setProgress(0)
            setIsError(true)
        }
        setMessage('something wrong!!!')
    }, [scriptListResponse])

    const onAddUpdateShowModal = (data, type) => {
        if (data) setModalData(data)
        if (type) setModalMode(type)
        setShowModal(true)
    }
    const onAddUpdateCloseModal = () => {
        setShowModal(false)
    }
    const onAddUpdate = () => {}
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
                            onAddUpdateShowModal()
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
                                <TableCell align="left">Purpose</TableCell>
                                <TableCell align="center">
                                    Operating System&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Status&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Update Time
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
                                    <TableCell align="left">
                                        {row.purpose}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.targetOS}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.updatetime}
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
            {showModal ? (
                <AddUpdateScriptModal
                    showModal={showModal}
                    onClose={onAddUpdateCloseModal}
                    onSubmit={onAddUpdate}
                    modalData={modalData}
                    modalMode={modalMode}
                />
            ) : null}
        </Container>
    )
}

export default ScriptList
