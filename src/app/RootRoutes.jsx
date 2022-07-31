import React from 'react'
import { Redirect } from 'react-router-dom'
import agentRoutes from './views/agents/AgentRoutes'
import scriptListRoutes from './views/scripts/ScriptListRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/runcmd/agentlist" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...agentRoutes,
    ...scriptListRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
