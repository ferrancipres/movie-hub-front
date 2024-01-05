import { ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from '../components'
import { Navigate } from 'react-router-dom'

type PrivateRoutesProps = {
    children: ReactNode
}

// Lo que le pasamos siempre a un componente son props, que podemos poner de esta manera como esta definido en la linea 11, o lo podemos desestructura dentro como estaba hecho complemtanemte que queda mucho más limpio
// En este caso recuerda que siempre que tipes un componente de react que devuelva un elemento de react hay que tipar con React.FC, en el caso de que quieras tipar algo de React sin definir el componente es tan simple como poner ": y el tipo que quieras"
const PrivateRoutes: React.FC<PrivateRoutesProps> = (props) => {
    const { children } = props;
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <Spinner />
    }

    return (
        isAuthenticated ? children : <Navigate to='/' replace={true} />
    )
}

export default PrivateRoutes