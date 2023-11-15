import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Details, Homepage, Profile } from '../pages'
import PrivateRoutes from './PrivateRoutes'

// Me da error FC
const RouterComponent: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/*' element={
                <PrivateRoutes>
                    <Routes>
                        <Route path='/details' element={<Details />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </PrivateRoutes>
            } />
        </Routes>
    )
}
export default RouterComponent