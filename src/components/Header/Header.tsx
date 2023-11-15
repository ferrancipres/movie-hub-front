import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <header className="header">
            <section className="header-container">
                <NavLink to={'/'}>
                    <img className="logo" src="" alt="Movie_Tracker_logo" />
                </NavLink>
            </section>
        </header>
    )
}