import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const ServerList = Loadable(lazy(() => import('./ServerList')))

const serverListRoutes = [
    {
        path: '/serverList/serverlist',
        element: <ServerList />,
        auth: authRoles.admin,
    },
]

export default serverListRoutes
