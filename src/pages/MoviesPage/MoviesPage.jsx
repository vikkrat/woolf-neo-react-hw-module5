import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        setLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;
    setSearchParams({ query: trimmed });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Movie Search</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Enter movie name..."
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            border: '2px solid #e52b50',
            width: '250px',
            marginRight: '12px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#e52b50',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 16px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {!loading && error && (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      )}

      {!loading && !error && query && movies.length === 0 && (
        <p style={{ textAlign: 'center' }}>
          No results found for "{query}"
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default MoviesPage;
