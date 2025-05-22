import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, NavLink, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!movie) return null;

  const { title, overview, poster_path, vote_average, genres } = movie;
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div style={{ padding: '20px' }}>
      <Link
        to={backLinkRef.current}
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          backgroundColor: '#e52b50',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '10px',
          textDecoration: 'none',
        }}
      >
        ← Go back
      </Link>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          marginBottom: '30px',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          width="300"
          style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />

        <div>
          <h2>{title}</h2>
          <p><strong>User score:</strong> {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Additional Information</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
          <li>
            <NavLink
              to={`/movies/${movieId}/cast`}
              state={location.state}
              style={({ isActive }) => ({
                color: isActive ? '#000' : '#e52b50',
                textDecoration: isActive ? 'underline' : 'none',
              })}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              state={location.state}
              style={({ isActive }) => ({
                color: isActive ? '#000' : '#e52b50',
                textDecoration: isActive ? 'underline' : 'none',
              })}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
