import { Route, Routes } from 'react-router-dom'
import { Homepage, Profile } from '../pages'
import { MovieDetails } from '../components'
import PrivateRoutes from './PrivateRoutes'
import { ProfileMovieDetails } from '../components/Profile Movie Details/ProfileMovieDetails'

// Porque no esta el browser router?
const RouterComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
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