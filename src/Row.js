import React, { useEffect, useState } from "react";
import axios from "./axios";
import { css } from "@emotion/core";

const base_url = "https://image.tmdb.org/t/p/original/";

const row = css`
  background-color: white;
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
  max-width: 100px;
  margin-right: 10px;
  transition: transform 450ms;

  :hover {
    transform: scale(1.08);
  }
`;

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div css={row}>
      <h2>{title}</h2>
      <div css={posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            css={row__posters}
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
