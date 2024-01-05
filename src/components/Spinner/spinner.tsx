import { FaSpinner } from 'react-icons/fa'
import './spinner.css'

export const Spinner = () => {
    //No tiene nada solo devuelve el icono con dos clases declaradas en el css
    return (
        <div className='spinner-style'>
            <FaSpinner className="spinner-move" size={30} />
        </div>
    )
}