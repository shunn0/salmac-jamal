import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Button
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Span } from 'app/components/Typography'
const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))

const configList = [
    {
        configuration: 'Firewall',
        lastEdited: '18 january, 2022',
        status: 'close',
    },
    {
        configuration: 'Log4J',
        lastEdited: '10 january, 2022',
        status: 'open',
    },
    {
        configuration: 'SSL Certificate',
        lastEdited: '8 january, 2022',
        status: 'close',
    },
]

const AgentConfigList = (props) => {
    const {agentData} = props;
    return (
        <Box width="100%" overflow="auto">
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <SimpleCard title="Config List">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        Configuration
                                    </TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">
                                        Last Edited
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {configList.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {data.configuration}
                                        </TableCell>
                                        <TableCell align="center">
                                            {data.status}
                                        </TableCell>
                                        <TableCell align="center">
                                            {data.lastEdited}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    </SimpleCard>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <SimpleCard title="Configuration : Firewall">
                    <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup
                            row
                            name="status"
                            sx={{ mb: 2 }}
                            //value={gender || ''}
                            //onChange={handleChange}
                        >
                            <FormControlLabel
                                value="true"
                                label="Enable"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="false"
                                label="Disable"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>
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
                    </SimpleCard>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AgentConfigList
