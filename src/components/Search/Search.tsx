import { FormEvent, useState } from 'react'
import './search.css'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate('/?search=' + search);
    }

    return (
        <form className='search-container' onSubmit={handleSubmit}>
            <div className='search-box'>
                <input className='search-input'
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className='search-button' type="submit">
                    <FaSearch size={18} />
                </button>
            </div>
        </form>
    )
}