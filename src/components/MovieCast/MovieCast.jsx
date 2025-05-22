// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieCredits } from '../../services/tmdbApi';
// import styles from './MovieCast.module.css';

// function MovieCast() {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchCast() {
//       try {
//         const data = await getMovieCredits(movieId);
//         setCast(data);
//       } catch (err) {
//         setError('Failed to load cast');
//       }
//     }

//     fetchCast();
//   }, [movieId]);

//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (cast.length === 0) return <p>No cast information available.</p>;

//   return (
//     <ul className={styles.castList}>
//       {cast.map(({ id, name, character, profile_path }) => (
//         <li key={id} className={styles.castItem}>
//           <div className={styles.imgWrapper}>
//             <img
//               src={
//                 profile_path
//                   ? `https://image.tmdb.org/t/p/w200${profile_path}`
//                   : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
//               }
//               alt={name}
//               className={styles.img}
//             />
//           </div>
//           <div>
//             <p><strong>{name}</strong></p>
//             <p>as {character || '—'}</p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default MovieCast;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/tmdbApi';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError('Failed to load cast');
      }
    }

    fetchCast();
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.castItem}>
          <div className={styles.imgWrapper}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={name}
              className={styles.img}
            />
          </div>
          <p className={styles.castItemName}>{name}</p>
          <p className={styles.castItemRole}>as {character || '—'}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
