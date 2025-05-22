import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdbApi';
import styles from './MovieReviews.module.css';

function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getMovieReviews(movieId);
                setReviews(data);
            } catch (err) {
                setError('Failed to load reviews');
            }
        }

        fetchReviews();
    }, [movieId]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (reviews.length === 0) return <p>No reviews available.</p>;

    return (
        <ul className={styles.reviewList}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={styles.reviewItem}>
                    <p className={styles.reviewAuthor}>{author}</p>
                    <p className={styles.reviewContent}>{content}</p>
                </li>
            ))}
        </ul>
    );
}

export default MovieReviews;
