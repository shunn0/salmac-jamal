import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AttackFxDetails from './AttackFxDetails'

const AttackFxList = Loadable(lazy(() => import('./AttackFxList')))

const AttackFxtRoutes = [
    {
        path: '/attackfx/attackfxlist',
        element: <AttackFxList />,
        auth: authRoles.admin,
    },
    {
        path: '/attackfx/attackfxdetails/:id',
        element: <AttackFxDetails />,
        auth: authRoles.admin,
    },
]

export default AttackFxtRoutes
