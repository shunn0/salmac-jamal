import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
    Box,
    Tabs,
    Tab,
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
    Typography,
    Breadcrumbs,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import RunCmd from '../runcmd/RunCmd'
import RunCmdInputFile from '../runcmd-input-file/RunCmdInputFile'
import AgentConfigList from './AgentConfigList'
import RunCmdInput from '../runcmd-input-file/RunCmdInput'

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
function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}
const AgentDetails = (props) => {
    const [value, setValue] = React.useState(0)
    const location = useLocation()
    const { agentData } = location.state
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Container>
            {agentData ? (
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'List of Agents',
                                path: '/agent/agentlist',
                            },
                            {
                                name:
                                    agentData.name + ' (' + agentData.ip + ')',
                                path: '/',
                            },
                        ]}
                    />
                </div>
            ) : (
                ''
            )}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Details" {...a11yProps(0)} />
                    <Tab label="Terminal" {...a11yProps(1)} />
                    <Tab label="File Execution" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AgentConfigList />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {agentData ? <RunCmd agentData={agentData} /> : ''}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {agentData ? (
                    <RunCmdInput agentData={agentData} isInputFile={true} />
                ) : (
                    ''
                )}
            </TabPanel>
        </Container>
    )
}
export default AgentDetails
