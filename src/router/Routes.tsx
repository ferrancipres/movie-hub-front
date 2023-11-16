import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Homepage, Profile } from '../pages'
import { MovieDetails } from '../components'

// Me da error FC
const RouterComponent: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='/user' element={<Profile />} />
        </Routes>
    )
}
export default RouterComponent