import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import agentRoutes from 'app/views/agents/AgentRoutes'
import scriptListRoutes from 'app/views/scripts/ScriptListRoutes'
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
            children: [...agentRoutes,...scriptListRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="/agent/agentlist" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
