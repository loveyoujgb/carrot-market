import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { __deleteComments } from "../redux/modules/commentsSlice";

const Buy = ({ comment }) => {
  console.log(comment);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const DoubleClickHandler = () => {
    if (member === comment.username) {
      if (window.confirm("정말 삭제합니까?")) {
        dispatch(__deleteComments(comment.id));
        alert("삭제되었습니다");
        navigate("/detail");
      } else {
        alert("취소합니다");
        navigate("/detail");
      }
    } else return;
  };
  const member = localStorage.getItem("username");
  console.log(member);
  console.log(comment.username);
  return (
    <div>
      <SecondMessageWrap>
        <UserInfoImg />
        <FirstSellerMessageWrap>
          <UsernameText style={{ margin: "0 10px" }}>
            {comment.nickname}
          </UsernameText>
          <SellerMessage onDoubleClick={DoubleClickHandler}>
            {comment.content}
          </SellerMessage>
        </FirstSellerMessageWrap>
        <SellerTime>{comment.creatAt}</SellerTime>
      </SecondMessageWrap>
    </div>
  );
};

export default Buy;

const UserInfoImg = styled.div`
  margin: 0 3px;
  background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png");
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
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

const SellerTime = styled.div`
  margin-left: 5px;
  font-size: 15px;
  margin-top: 4px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
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
