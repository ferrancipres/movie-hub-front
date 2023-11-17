import { NavLink } from "react-router-dom"
import logo from '../../assets/img/logo.png'
import './header.css'
// import { Search } from "../Search/Search"
import { FaUser } from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from "../Spinner/Spinner"
import { RiHome2Fill } from "react-icons/ri";
import { IoLockClosedSharp } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";



export const Header = () => {
    const { user, loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()

    if (isLoading) {
        <Spinner />
    }
    console.log(isAuthenticated)
    console.log(user)

    return (
        <header className="header">
            <section className="header-container">
                <div className="header-logo">
                    <NavLink to={'/'}>
                        <img className="logo_img" src={logo} alt="Movie_Tracker_logo" />
                    </NavLink>
                    <p className="logo_text"> Movie Tracker</p>
                </div>
                {/* <Search /> */}
                <div className="header-icons">
                    <NavLink to={'/'}>
                        <button className="button-style"><RiHome2Fill size={25} /></button>
                    </NavLink>
                    <NavLink to={'/user'}>
                        <button className="button-style"><FaUser size={20} /></button>
                    </NavLink>
                    <div>
                        {isAuthenticated ? (
                            <button className="button-style" onClick={(): Promise<void> => logout()}><RiLogoutBoxRLine size={22} /></button>
                        ) : (
                            <button className="button-style" onClick={(): Promise<void> => loginWithRedirect()}><IoLockClosedSharp size={22} /></button>
                        )}
                    </div>
                </div>
            </section>
        </header>
    )
}