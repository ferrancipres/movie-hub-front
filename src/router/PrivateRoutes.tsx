import { FC, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from '../components'
import { Navigate } from 'react-router-dom'

type PrivateRoutesProps = {
    children: ReactNode
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <Spinner />
    }

    return (
        isAuthenticated ? children : <Navigate to='/' replace={true} />
    )
}

export default PrivateRoutes