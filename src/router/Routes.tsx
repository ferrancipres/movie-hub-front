import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Homepage, Profile } from '../pages'
import { MovieDetails } from '../components'
import PrivateRoutes from './PrivateRoutes'

// Me da error FC
const RouterComponent: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='/user' element={
                <PrivateRoutes><Profile /></PrivateRoutes>
            } />
        </Routes>
    )
}
export default RouterComponent