import React, { useState } from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModals/LoginModal.jsx";
import KakaoImg from "../img/KakaoImg.png";

const Header = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <HeaderWrap>
        <LogoLink>
          <LogoImg
            onClick={() => {
              navigate("/");
            }}
            logo={logo}
          ></LogoImg>
          <Title
            onClick={() => {
              navigate("/");
            }}
          >
            중고거래
          </Title>
        </LogoLink>
        <RightWrap>
          <button
            style={{ border: "1px solid #bbbbbb", fontWeight: "bold" }}
            onClick={openModal}
            className="button is-white"
          >
            로그인
          </button>
          <LoginModal open={modalOpen} close={closeModal}>
            <main>
              <ButtonInModalWrap>
                <img
                  style={{ width: "50%", marginTop: "8%" }}
                  src={logo}
                  alt="이미지"
                />
                <h2 style={{ fontWeight: "bold" }}>
                  우리 동네 중고 직거래 마켓
                </h2>
                <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                  내 동네를 설정하고 <br /> 당근마켓을 시작해보세요.
                </p>

                <img style={{ width: "80%" }} src={KakaoImg} alt="이미지" />
              </ButtonInModalWrap>
            </main>
          </LoginModal>
          <button
            style={{ border: "1px solid #bbbbbb", fontWeight: "bold" }}
            className="button is-white"
          >
            회원가입
          </button>
        </RightWrap>
      </HeaderWrap>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 50px;
  width: 75%;
  background-color: #fff;
  margin: 0 auto 5px auto;
`;

const HeaderWrap = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  max-width: 100%;
`;

const LogoLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  font-size: 16px;
`;

const Title = styled.h1`
  cursor: pointer;
  color: #ff7518;
  font-weight: bold;
  font-size: 20px;
  margin: 5px 0 0 20px;
`;

const LogoImg = styled.div`
  cursor: pointer;
  background-image: url(${(props) => props.logo});
  display: inline-block;
  width: 100px;
  height: 50px;
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  overflow: hidden;
`;

const RightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonInModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* margin: 3%; */
  box-sizing: border-box;
`;
