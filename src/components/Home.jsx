import React from "react";
import styled from "styled-components";
import MainAd from "../img/mainAd.jpg";
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
    </div>
  );
};

export default Home;

const ArticleWrap = styled.article`
  background-color: #fbf7f2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80vh;
  @media screen and (max-width: 556px) {
    flex-direction: column;
    padding: 30px 0;
  }
`;
const TextWrap = styled.div`
  padding-left: 12%;
  padding-top: 12%;
  width: 50%;
  max-width: 360px;
  @media screen and (max-width: 556px) {
    width: 90%;
  }
`;
const ImgWrap = styled.div`
  width: 65%;
  height: 100%;
  @media screen and (max-width: 556px) {
    width: 90%;
  }
`;
const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
const SubTitle = styled.h2`
  font-size: 47px;
  text-align: left;
  margin-bottom: 32px;
  @media screen and (max-width: 556px) {
    text-align: center;
  }
`;
const ContentText = styled.p`
  font-size: 16px;
  text-align: left;
  @media screen and (max-width: 556px) {
    text-align: center;
  }
`;
