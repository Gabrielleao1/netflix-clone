import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { getMovies } from '../../services/api';

import './style.css';

const imageHOST = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, path, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  function handleOnclik(movie){
    if(trailerURL) {
      setTrailerURL("")
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "").then((url) => {
        setTrailerURL(url);
      }).catch((error) => console.log("Error fetching movie trailer: ", error));
    }
  }

  async function fetchMovies(_path) {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

 return (
   <div className='row-container'>
    <h2 className='row-header'>{title}</h2>
    <div className='row-cards'>
        {movies?.map(movie => {
          return (
            <img 
              className={`row-movie-card ${isLarge && "row-movie-card-large"}`}
              onClick={() => handleOnclik(movie)}
              key={movie.id} 
              src={`${imageHOST}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
              alt={movie.name}>
            </img>
          );
        })}
    </div>
    { trailerURL && <ReactPlayer url={trailerURL} playing={true} /> }
   </div>
 );
}