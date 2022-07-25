import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import runCmdRoutes from 'app/views/runcmd/RunCmdRoutes'
import runCmdInputRoutes from 'app/views/runcmd-input-file/RunCmdInputRoutes'
import serverListRoutes from 'app/views/serverList/ServerListRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...runCmdRoutes,...runCmdInputRoutes,...serverListRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="runcmd/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
