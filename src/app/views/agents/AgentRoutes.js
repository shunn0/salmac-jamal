import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AgentDetails from './AgentDetails'

const AgentList = Loadable(lazy(() => import('./AgentList')))

const AgentListRoutes = [
    {
        path: '/agent/agentlist',
        element: <AgentList />,
        auth: authRoles.admin,
    },
    {
        path: '/agent/agentdetails/:id',
        element: <AgentDetails />,
        auth: authRoles.admin,
    },
]

export default AgentListRoutes
