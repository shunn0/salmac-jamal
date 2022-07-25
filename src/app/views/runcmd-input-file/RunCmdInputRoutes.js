import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const RunCmdInputFile = Loadable(lazy(() => import('./RunCmdInputFile')))

const runCmdRoutes = [
    {
        path: '/runcmd-input-file/runbyfile',
        element: <RunCmdInputFile />,
        auth: authRoles.admin,
    },
]

export default runCmdRoutes
