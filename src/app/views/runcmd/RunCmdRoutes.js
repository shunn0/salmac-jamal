import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const RunCmd = Loadable(lazy(() => import('./RunCmd')))

const runCmdRoutes = [
    {
        path: '/runcmd/default',
        element: <RunCmd />,
        auth: authRoles.admin,
    },
]

export default runCmdRoutes
