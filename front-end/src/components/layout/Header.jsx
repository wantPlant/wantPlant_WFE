import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import MainLogoButton from "../webHeader/MainLogoButton";
import WelcomeMessage from "../webHeader/WelcomMessage";
import BookButton from "../webHeader/BookButton";
import ProfileButton from "../webHeader/ProfileButton";
import LogoutButton from "../webHeader/LogoutButton";
import { useRecoilValue } from "recoil";
import { InitGardenAtom } from "../../recoil/atom";

/** 사용자 닉네임을 받는 Header */
export function Header({ name }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const initGarden = useRecoilValue(InitGardenAtom);

    // 스크롤 시 헤더 스타일 변경
    useEffect(() => {
        const handleScroll = () => {
            // 현재 스크롤을 저장하는 currScroll
            const currScroll = window.scrollY;
            if (currScroll === 0) {
                // 스크롤이 맨 위
                setIsScrolled(false);
            } else {
                // 그 외
                setIsScrolled(true);
            }
        };
        // 'window' 에서 'scroll' 이 감지? 되면 handleScroll 함수를 호출하는 event listener
        window.addEventListener("scroll", handleScroll);

        return () => {
            // 켜둔 event listener 끔
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navigate = useNavigate();

    const handleClickMain = () => {
        navigate(`/garden/${initGarden}`);
    };

    const handleClickBook = () => {
        navigate("/garden/book");
    };

    const handleClickProfile = () => {
        navigate("/profile");
    };

    const handleClickLogout = () => {
        navigate("/login");
    };

    if (isScrolled) {
        return (
            <ScrolledContainer>
                <MainLogoButton onClick={handleClickMain} />
                <Menu>
                    <WelcomeMessage name={name} />
                    <Buttons>
                        <BookButton onClick={handleClickBook} />
                        <ProfileButton onClick={handleClickProfile} />
                        <LogoutButton onClick={handleClickLogout} />
                    </Buttons>
                </Menu>
            </ScrolledContainer>
        );
    } else {
        return (
            <Container>
                <MainLogoButton onClick={handleClickMain} />
                <Menu>
                    <WelcomeMessage name={name} />
                    <Buttons>
                        <BookButton onClick={handleClickBook} />
                        <ProfileButton onClick={handleClickProfile} />
                        <LogoutButton onClick={handleClickLogout} />
                    </Buttons>
                </Menu>
            </Container>
        );
    }


}

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    width: auto;
    height: 80px;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
`;

const ScrolledContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    width: auto;
    height: 80px;
    background-color: white;
    border-bottom: ${({ theme }) => (`1px solid ${theme.colors.strokeGray}`)};
    box-shadow: ${({ theme }) => (`0px 0px 4px 0px ${theme.colors.strokeGray}`)};
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
`

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const Buttons = styled.div`
    display: flex;
    align-items: center;
    width: 120px;
    justify-content: space-between;
`;
