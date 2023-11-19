import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Homepage, Profile } from '../pages'
import { MovieDetails } from '../components'
import PrivateRoutes from './PrivateRoutes'
import { ProfileMovieDetails } from '../components/Profile Movie Details/ProfileMovieDetails'

// Me da error FC
const RouterComponent: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            //CUIDADO POSIBLE MODIFICACION name..
            <Route path='/user/movie/:movieId' element={<ProfileMovieDetails />} />
            <Route path='/user' element={
                <PrivateRoutes>
                    <Profile />
                </PrivateRoutes>
            } />
        </Routes>
    )
}
export default RouterComponent