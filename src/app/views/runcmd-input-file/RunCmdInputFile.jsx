import React from 'react'
import RunCmdInput from './RunCmdInput'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

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

const RunCmdInputFile = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Run by File', path: '/' }]} />
            </div>
            <SimpleCard title="Run From File !">
                <RunCmdInput />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default RunCmdInputFile
