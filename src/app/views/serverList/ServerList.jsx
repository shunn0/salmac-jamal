import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Icon,
    Grid,
    TextareaAutosize,
    Snackbar,
    Alert,
    Typography,
    ListItem
} from '@mui/material'
import { Span } from 'app/components/Typography'
import { Breadcrumb, SimpleCard } from 'app/components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Box, styled } from '@mui/system'
import { getServersList } from 'app/redux/actions/RunCommandActions'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {date} from "yup";

function createData(
    name: string,
    ipaddress: string,
    os: string,
    status: string,
    lastdowntime: date,
) {
    return { name, ipaddress, os, status, lastdowntime };
}

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


const rows = [
    createData('www.eefatchics.com', '10.10.1.10', 'Linux', 'Active', '2022-04-04 00:00:00'),
    createData('Eefat Murgis', '10.10.1.11', 'Linux', 'Active', '2022-04-04 00:00:00'),
    createData('Murgi Eefat eComm', '10.10.1.12', 'Linux', 'Active', '2022-04-04 00:00:00'),
    createData('Murgi Eefat Admin', '10.10.1.10', 'Windows', 'Active', '2022-04-04 00:00:00'),
    createData('Murgi Eefat kiJen', '10.10.1.10', 'Linux', 'Active', '2022-04-04 00:00:00'),
];

const ServerList = () => {
    const dispatch = useDispatch()
    const[serverList,setServerList]=useState([])
    //fetch(getServersList()).then(console.log)
    /*useEffect(() => {
        dispatch(getServersList())
        })
    },[])*/

    console.log("++++++++++++++++++")
    //console.log(getServersList())
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'List of Server', path: '/' }]}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name(If any)</TableCell>
                                <TableCell align="right">IP Address</TableCell>
                                <TableCell align="right">Operating System&nbsp;(g)</TableCell>
                                <TableCell align="right">Status&nbsp;(g)</TableCell>
                                <TableCell align="right">Last Downtime&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.ipaddress}</TableCell>
                                    <TableCell align="right">{row.os}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.lastdowntime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </Container>
    )
}

export default ServerList
