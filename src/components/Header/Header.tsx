import { NavLink } from "react-router-dom"
import logo from '../../assets/img/logo.png'
import './header.css'
import { Search } from "../Search/Search"
import { FaUserLock, FaUserCheck } from 'react-icons/fa'
import { MdAddCircle } from "react-icons/md";

export const Header = () => {
    return (
        <header className="header">
            <section className="header-container">
                <div className="header-logo">
                    <NavLink to={'/'}>
                        <img className="logo_img" src={logo} alt="Movie_Tracker_logo" />
                    </NavLink>
                    <p className="logo_text"> Movie Tracker</p>
                </div>
                <Search />
                <div className="header-icons">
                    {/* AQUI DEBERÏA IR A PROFIL..POR RUTA PRIVADA */}
                    <MdAddCircle size={25} />
                    <NavLink to={'/user'}>
                        <FaUserLock size={25} />
                    </NavLink>
                </div>
            </section>
        </header>
    )
}