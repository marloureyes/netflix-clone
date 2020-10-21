import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Navigation = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    height: 30px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    ${({ scroll }) => scroll ? "background-color: #111;" : null}
    transition-timing-function: ease-in;
    transition: all 0.5s;
    
`;
const imgLogo = css`
    position: fixed;
    left: 20px;
    width: 90px;
    object-fit: contain;
`;

const imgProfile = css`
    right: 20px;
    position: fixed;
    width: 30px;
    object-fit: contain;
`;
export default function Nav() {
    const [handleScroll, setHandleScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setHandleScroll(true);
            } else {
                setHandleScroll(false)
            }
        });
        return () => {
            window.removeEventListener("scroll")
        }
    }, []);
    return (
        <Navigation scroll={handleScroll}>
            <img css={imgLogo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img
                css={imgProfile}
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="Netflix Profile"
            />
        </Navigation>
    )
}