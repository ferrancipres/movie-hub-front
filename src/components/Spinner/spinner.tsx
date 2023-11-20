import { FaSpinner } from 'react-icons/fa'
import './spinner.css'

export const Spinner = () => {
    return (
        <div className='spinner-style'>
            <FaSpinner className="spinner-move" size={30} />
        </div>
    )
}