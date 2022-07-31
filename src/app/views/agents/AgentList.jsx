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
} from '@mui/material'
import { Span } from 'app/components/Typography'
import { Breadcrumb, SimpleCard } from 'app/components'
import { getAgentList, getAgentListReset } from 'app/redux/actions/AgentAction'
import AddUpdateAgentModal from './modal/AddUpdateAgentModal'
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

const AgentList = () => {
    const loading = useSelector((state) => state.scriptReducer.loading)
    const agentListResponse = useSelector(
        (state) => state.agentReducer.agentListResponse
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
    const [agentList, setAgentList] = useState([])

    useEffect(() => {
        dispatch(getAgentListReset())
        dispatch(getAgentList())
    }, [])
    useEffect(() => {
        if (!agentListResponse) {
            return
        }
        if (
            agentListResponse &&
            agentListResponse.status === 'ok' &&
            agentListResponse.data.length > 0
        ) {
            setAgentList(agentListResponse.data)
        } else if (agentListResponse && agentListResponse.status === 'error') {
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
    }, [agentListResponse])

    const getCommonRow = (label, align) => {
        return (
            <Tooltip title={label}>
                <TableCell align={align || 'center'}>{label}</TableCell>
            </Tooltip>
        )
    }
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
                    routeSegments={[{ name: 'List of Agents', path: '/' }]}
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
                        onClick={onAddUpdateShowModal}
                    >
                        <Icon>add_circle</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add New Agent
                        </Span>
                    </Button>
                </div>

                <Box width="100%" overflow="auto">
                    <StyledTable>
                        {loading ? <LinearProgress /> : ''}
                        <TableHead>
                            <TableRow>
                                <TableCell>Name(If any)</TableCell>
                                <TableCell align="center">IP Address</TableCell>
                                <TableCell align="center">
                                    Operating System&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Status&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Last Uptime&nbsp;(g)
                                </TableCell>
                                <TableCell align="center">
                                    Last Downtime&nbsp;(g)
                                </TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agentList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <Tooltip title={row.name}>
                                        <TableCell align={'left'}>
                                            <Link
                                                className="anchor-link"
                                                to={
                                                    '/agent/agentdetails/' +
                                                    row.id
                                                }
                                            >
                                                {row.name}
                                            </Link>
                                        </TableCell>
                                    </Tooltip>
                                    {getCommonRow(row.ip, 'center')}
                                    {getCommonRow(row.os, 'center')}
                                    {getCommonRow(row.status, 'center')}
                                    {getCommonRow(row.latestUptime, 'center')}
                                    {getCommonRow(row.latestDowntime, 'center')}
                                    <TableCell align="right">
                                        <Tooltip title="Delete Agent">
                                            <IconButton
                                                onClick={() => {
                                                    onAddUpdateShowModal(
                                                        row,
                                                        'EDIT'
                                                    )
                                                }}
                                            >
                                                <Icon color="secondary">
                                                    edit
                                                </Icon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Agent">
                                            <IconButton>
                                                <Icon color="error">
                                                    delete
                                                </Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        //sx={{ px: 2 }}
                        //page={page}
                        component="div"
                        // rowsPerPage={rowsPerPage}
                        // count={subscribarList.length}
                        // onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                        // nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                        //  backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    />
                </Box>
            </SimpleCard>
            {showModal ? (
                <AddUpdateAgentModal
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

export default AgentList
