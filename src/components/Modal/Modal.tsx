import './modal.css'
// useRef es un hook que nos permite acceder al DOM de un elemento
// useState es un hook que nos permite crear y controlar un estado
// useEffect es un hook que nos permite ejecutar código cuando se monta o desmonta un componente
// useCallback es un hook que nos permite crear una función y que no se vuelva a crear cada vez que se renderiza un componente
// fowardRed es un hook que nos permite traspasar una ref a otro componente children
import { useRef, useState, useEffect, useCallback, forwardRef } from 'react'

// Es necesario tipar todas las props que va a necesitar el modal => isOpen, onClose, hasCloseBtn, children
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    hasCloseBtn: boolean;
    children: React.ReactNode;
}

// Tenemmos el componente modal lo primero que debemos hacer un construirlo desde el hook fowardRef que nos permitira traspasar una ref a otro componente children
// Necesario tipar el componente con React.FC, ModalProps y el ref
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ isOpen, hasCloseBtn, onClose, children }, ref) => {
    // Queremos crear y controlar el estado del modal en este caso isModalOpen, setIsModalOpen y lo inicializamos con el estado de isOpen aunque podría ser true o false
    // Es interesante que se puede tipar la información de un estado, en este caso boolean
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    // Creamos la constante innerRef que nos permite acceder al DOM del elemento a través del hook useRef y lo tipamos y lo inicializamos con null
    const innerRef = useRef<HTMLDialogElement | null>(null);
    // Creamos la constante resolvedRef que nos permite definir el ref que queremos utilizar
    const resolvedRef = ref || innerRef;

    //useEffect es un hook que nos permite ejecutar código cuando el argumento que le pasamos cambia, en este caso cuando cambia el estado de isOpen
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    //useEffect es un hook que nos permite definir modalElement con modalElement = 'current' in resolvedRef ? resolvedRef.current : null;
    // Permite ejecutar el condicional de si existe modalElement y si isModalOpen es true que muestre el modal, en caso contrario 
    // que cierre el modal
    // Este useEffect se ejecutará cuando cambie el estado de isModalOpen o resolvedRef
    useEffect(() => {
        const modalElement = 'current' in resolvedRef ? resolvedRef.current : null;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen, resolvedRef]);

    // Función que nos permite cerrar el modal, en caso de que onClose exista que se ejecute y que setIsModalOpen sea false
    // Además hemos querido añadir una hook useCallback para que no se vuelva a crear cada vez que se renderiza un componente
    // Es interesante porque el useCallback tiene una dependencia de onclose, que en el caso de que cambie se volverá a ejecutar
    const handleCloseModal = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    }, [onClose]);

    // useEffect es un hook que nos permite ejecutar código cuando se monta o desmonta un componente
    // Eb este casi creamos la función handleKeyDown que nos permite cerrar el modal cuando se pulsa la tecla "Escape"
    // Le hemos añadido un EventListener para que cuando se pulse la tecla "Escape" se ejecute la función handleKeyDown
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleCloseModal]);

    // Aqui queremos que se muestre por pantalla
    // En este caso dialog hace referencia al elemento HTML <dialog> que nos permite crear un modal, le añadimos ref={resolvedRef} para que se pueda acceder al DOM del elemento
    // Le añadimos el método hasCloseBtn para que se muestre el botón de cerrar modal y que se ejecute la función handleCloseModal
    return (
        <dialog ref={resolvedRef} className="modal">
            {hasCloseBtn && (
                <button className="modal-close-btn" onClick={handleCloseModal}>X</button>
            )}
            {children}
        </dialog>
    )
});

// Entiendo que children es un prop que nos permite pasarle un componente como prop a otro componente, en este caso al modal