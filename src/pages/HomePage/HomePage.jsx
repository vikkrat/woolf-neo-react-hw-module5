import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true);
                const trending = await getTrendingMovies();
                setMovies(trending);
                setError(null);
            } catch (err) {
                setError('Failed to load trending movies.');
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '30px',
                }}
            >
                <h1 style={{ fontFamily: 'Dancing Script', fontSize: '36px', color: '#e52b50', margin: 0 }}>
                    Trending Today
                </h1>
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
            {!loading && movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}

export default HomePage;
