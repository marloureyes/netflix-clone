import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Header = styled.header`
    background-size: cover;
    background-image: url(
        "http://image.tmdb.org/t/p/original/${({ backgroundImageProp }) => backgroundImageProp}"
    );
    background-position: center center;
    color: white;
    object-fit: contain;
    height: 448px;
`;

const bannerContent = css`
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
`;

const bannerTitle = css`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
`;
const bannerButton = css`
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    margin-right: 1rem;
    background-color: rgba(51,51,51,0.5);
`
    ;

const bannerDesc = css`
    width: 50%;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
`;

const buttonContainer = css`
    `;

const bannerFade = css`
    height: 7.4rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37,37,37,0.61),
        #111
    )
`;
export default function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchMovie() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchMovie();
    }, []);

    return (
        <Header backgroundImageProp={movie?.backdrop_path}>
            <div css={bannerContent}>
                <h1 css={bannerTitle}>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div css={buttonContainer}>
                    <button css={bannerButton}>
                        Play
                    </button>
                    <button css={bannerButton}>
                        My List
                    </button>
                </div>
                <h1 css={bannerDesc}>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div css={bannerFade} />
        </Header>
    )
}