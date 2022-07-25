import React from 'react'
import { Redirect } from 'react-router-dom'
import runCmdRoutes from './views/runcmd/RunCmdRoutes'
import runCmdInputRoutes from './views/runcmd-input-file/RunCmdInputRoutes'
import serverListRoutes from './views/serverList/ServerListRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/runcmd/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...runCmdRoutes,
    ...runCmdInputRoutes,
    ...serverListRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
