import React, { useEffect, useState } from 'react'
import './addModalMovie.css'
import { Modal } from '../Modal/Modal'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserContext } from '../../utils/useUserContext';
import { createNewMovie } from '../../services/movies.service';
import { useAuth0 } from '@auth0/auth0-react';

type AddMovieModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string
    genres: string[]
    score: string
    poster_image: string
}

export const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const { getAccessTokenSilently } = useAuth0();

    const { register, handleSubmit, reset, formState } = useForm<FormValues>();
    const { currentUser } = useUserContext()

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    };

    // CUIDADO he cambiado el tipado de data!!!
    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        const userId = currentUser?.id
        if (userId) await createNewMovie(userId, data, getAccessTokenSilently)

    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name: "", score: "", poster_image: "", genres: [] })
            handleCloseModal()
            location.reload()
        }
    }, [formState, reset])

    return (
        <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
            <main className="modal-wrapper">
                <article className="form">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <p className="form-text">Name</p>
                        <input type="text" placeholder="Example123" {...register("name", { required: true, max: 30, min: 1 })} />
                        <p className="form-text">Genre</p>
                        <input type="text" placeholder="Action" {...register("genres", { required: true, max: 30 })} />
                        <p className="form-text">Score</p>
                        <input type="string" placeholder="0 to 10" {...register("score", { required: true, max: 10, min: 0 })} />
                        <p className="form-text">Image</p>
                        <input type="text" placeholder="imageUrl" {...register("poster_image", { required: false })} />

                        <input type="submit" value="Add Movie" className="add-movie-btn" />
                    </form>
                </article>
            </main>
        </Modal>
    )
};
