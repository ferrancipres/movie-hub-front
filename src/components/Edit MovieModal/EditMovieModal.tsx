import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserContext } from '../../utils/useUserContext';
import { updateMovie } from '../../services/movies.service';
import { useNavigate, useParams } from 'react-router-dom';
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

export const EditMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose }) => {

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    };
    
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const { register, handleSubmit, reset, formState } = useForm<FormValues>();
    const { getAccessTokenSilently } = useAuth0();

    const { currentUser } = useUserContext()
    const { movieId: nameParam } = useParams()

    const movieDetail = currentUser ? currentUser?.movies.find((movie) => {
        return movie.name == nameParam
    }) : undefined

    if (!movieDetail) return null

    // Cuidado he cambiado el tipado de data
    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        const userId = currentUser?.id
        if (userId) await updateMovie(movieDetail.id, data, getAccessTokenSilently)
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name: "", score: "", poster_image: "", genres: [] })
            handleCloseModal()
            navigate('/user')
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

                        <input type="submit" value="Edit Movie" className="addMovi-btn" />
                    </form>
                </article>
            </main>
        </Modal>
    )
}
