import React, { useEffect, useState } from "react";

import "./style.css";
import categories, { getMovies } from "../../services/api";

const imageHOST = "https://image.tmdb.org/t/p/original/";

export default function Banner() {
  const [movie, setMovie] = useState({});

  async function fetchRandomMovie() {
    try {
      const netflixOriginalsCategory = categories.find(
        (category) => category.name === "netflixOriginals"
      );

      const data = await getMovies(netflixOriginalsCategory.path);
      const randomIndex = Math.floor(Math.random() * data.results.length);

      setMovie(data?.results[randomIndex]);
    } catch (error) {
      console.log("Error fetchRandomMovie: ", error);
    }
  }

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.subtr(0, n - 1) + "..." : str;
  }

  return (
    <header className="banner-container" style={{
        backgroundImage: `url(${imageHOST}${movie?.backdrop_path})`
    }}>
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-button-container">
          <button className="banner-button">Assistir</button>
          <button className="banner-button">Minha Lista</button>
        </div>
        <div className="banner-description">
          <h2>{truncate(movie?.overview)}</h2>
        </div>
      </div>
    </header>
  );
}
