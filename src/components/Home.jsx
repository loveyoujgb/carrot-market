import React from "react";
import styled from "styled-components";
import MainAd from "../img/mainAd.jpg";
import Footer from "./Footer";
import HomeList from "./HomeList";

const Home = () => {
  return (
    <div>
      <ArticleWrap>
        <TextWrap>
          <SubTitle>
            당신 근처의
            <br />
            당근마켓
          </SubTitle>
          <ContentText>
            중고 거래부터 동네 정보까지, 이웃과 함께해요.
            <br />
            가깝고 따뜻한 당신의 근처를 만들어요.
          </ContentText>
        </TextWrap>
        <ImgWrap>
          <Img src={MainAd} alt="광고" />
        </ImgWrap>
      </ArticleWrap>
      <HomeList />
      <Footer />
    </div>
  );
};

export default Home;

const ArticleWrap = styled.div`
  background-color: #fbf7f2;
  display: flex;
  height: 90vh;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  @media screen and (max-width: 556px) {
    flex-direction: column;
    padding: 30px 0;
  }
`;
const TextWrap = styled.div`
  padding-left: 10%;
  padding-top: 15%;
  /* width: 50%; */
  max-width: 50%;
  @media screen and (max-width: 556px) {
    padding-left: 0%;
    padding-top: 0%;
    margin: auto;
    width: 100%;
  }
`;
const ImgWrap = styled.div`
  height: 100%;
  margin-left: 13%;
  @media screen and (max-width: 556px) {
    width: 90%;
    margin-left: 0;
  }
`;
const Img = styled.img`
  object-fit: contain;
  padding-left: 5%;
  width: 100%;
  height: 100%;
`;
const SubTitle = styled.h2`
  font-size: 47px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 32px;
  @media screen and (max-width: 556px) {
    text-align: center;
    font-size:38px;
  }
`;
const ContentText = styled.p`
  font-size: 15px;
  text-align: left;
  @media screen and (max-width: 556px) {
    text-align: center;
    font-size:15px;
  }
`;
