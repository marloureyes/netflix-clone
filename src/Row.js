import React, { useEffect, useState } from "react";
import axios from "./axios";
import { css } from "@emotion/core";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const row = css`
  margin-left: 30px;
  color: white; 
`;

const posters = css`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const row__posters = css`
  width: 100%;
  object-fit: contain;
  max-height: 100px;
  margin-right: 10px;
  transition: transform 450ms;

  :hover {
    transform: scale(1.08);
  }
`;

const row__postersLarge = css`
  max-height: 250px;

  :hover {
    transform: scale(1.09);
    opacity: 1;
  }
`;


function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: "100%",
    playerVars: {
      autoplay: 1.
    }
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(`Url Params: ${urlParams}`);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => { console.log(error) })
    }
  }

  return (
    <div css={row}>
      <h2>{title}</h2>
      <div css={posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            css={isLargeRow ? [row__posters, row__postersLarge] : row__posters}
            onClick={() => handleClick(movie)}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
