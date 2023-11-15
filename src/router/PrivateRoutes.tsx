import { useContext } from 'react';
import { Navigate } from 'react-router-dom'

type PrivateRoutesProps = {
    children: React.ReactNode;
}

// Es necesario con el 'auth-0'
const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    //  pendiente auth-0
    return
}

export default PrivateRoutes