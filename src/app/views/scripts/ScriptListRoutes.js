import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const ScriptList = Loadable(lazy(() => import('./ScriptList')))

const ScriptListRoutes = [
    {
        path: '/script/scriptList',
        element: <ScriptList />,
        auth: authRoles.admin,
    },
]

export default ScriptListRoutes
