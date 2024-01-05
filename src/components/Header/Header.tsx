import './header.css'
import { Spinner } from ".."
import { FaUser } from 'react-icons/fa'
// ¿Por qué no usas el componente Link?
import { NavLink } from "react-router-dom"

import logo from '../../assets/img/logo.png'
import { useAuth0 } from '@auth0/auth0-react'
import { IoLockClosedSharp } from "react-icons/io5";
import { RiHome2Fill, RiLogoutBoxRLine } from "react-icons/ri";

export const Header = () => {
    // Intersante todos los componentes que se pueden sacar, ¿cómo sabes que existe useAuth0?
    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()

    if (isLoading) {
        <Spinner />
    }
    // Contenedor div para el botón de login / logout
    // Al tener un switch tiene que tener cierta lógica lo que implica un if / else or ternario

    return (
        <header className="header">
            <section className="header-container">
                <div className="header-logo">
                    <NavLink to={'/'}>
                        <img className="logo_img" src={logo} alt="movie_logo" />
                    </NavLink>
                    <p className="logo_text"> Movie Tracker </p>
                </div>
                <div className="header-icons">
                    <NavLink to={'/'}>
                        <button className="header-style-btn"><RiHome2Fill size={25} /></button>
                    </NavLink>
                    <NavLink to={'/user'}>
                        <button className="header-style-btn"><FaUser size={20} /></button>
                    </NavLink>
                    <div>
                        {isAuthenticated ? 
                        (
                            <button type="button" className="header-style-btn" onClick={(): Promise<void> => logout()}><RiLogoutBoxRLine size={22} /></button>
                        ) : (
                            <button className="header-style-btn" onClick={(): Promise<void> => loginWithRedirect()}><IoLockClosedSharp size={22} /></button>
                        )}
                    </div>
                </div>
            </section>
        </header>
    )
}
// Me parece extremadamente interesante la forma en la que se puede tipar un "arrow function" de un onClick con React.FC
// Siempre que se tena que utilizar la lógica, switch, diferentes escesarios siempre estaré if / else or ternario
