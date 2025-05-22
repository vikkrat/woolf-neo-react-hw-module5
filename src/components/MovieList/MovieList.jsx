import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.link}
          >
            🎬 {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
