import React from "react";
import styled from "styled-components";

const CommentChat = () => {
  return (
    <>
      <CommentChatWrqp>
        <FirstMessageWrap>
          <SecondMessageWrap>
            <Time>오전 10:00</Time>
            <FirstMessageWrap>
              <UsernameText style={{ margin: "0 10px" }}>구매자</UsernameText>
              <Message>얼마인가요 네고되나요</Message>
            </FirstMessageWrap>
            <UserInfoImg />
          </SecondMessageWrap>
        </FirstMessageWrap>
        <SecondMessageWrap>
          <UserInfoImg />
          <FirstSellerMessageWrap>
            <UsernameText style={{ margin: "0 10px" }}>판매자</UsernameText>
            <SellerMessage>안되는데요</SellerMessage>
          </FirstSellerMessageWrap>
          <SellerTime>오전 10:01</SellerTime>
        </SecondMessageWrap>
      </CommentChatWrqp>
    </>
  );
};
export default CommentChat;

const CommentChatWrqp = styled.div`
  width: 100%;
`;

const UserInfoImg = styled.div`
  margin: 0 3px;
  background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png");
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const FirstMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const SecondMessageWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const FirstSellerMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UsernameText = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: #868e96;
`;

const Time = styled.div`
  font-size: 15px;
  line-height: 1.46;
  margin-right: 5px;
  letter-spacing: -0.6px;
  color: #868e96;
`;

const SellerTime = styled.div`
  margin-left: 5px;
  font-size: 15px;
  margin-top: 4px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
`;

const Message = styled.div`
  color: white;
  padding: 8px 20px;
  border-radius: 40px;
  min-height: 40px;
  background-color: #ff7518;
  display: table-cell;
  vertical-align: middle;
`;

const SellerMessage = styled.div`
  color: black;
  padding: 8px 20px;
  border-radius: 40px;
  min-height: 40px;
  background-color: #e9e9e9eb;
  display: table-cell;
  vertical-align: middle;
  /* @media screen and (max-width: 556px) {
    background-color: green;
  } */
`;
