import React from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { __deleteComments } from "../redux/modules/commentsSlice";

const Sale = ({ comment }) => {
  const member = localStorage.getItem("username");
  const dispatch = useDispatch();
  const DoubleClickHandler = () => {
    if (member === comment.username) {
      if (window.confirm("정말 삭제합니까?")) {
        dispatch(__deleteComments(comment.id));
        // alert("삭제되었습니다");
        // navigate(`/detail/${comment.id}`);
      } 
    } else return;
  };
  return (
    <div>
      <FirstMessageWrap>
        <SecondMessageWrap>
          <Time>{comment.creatAt}</Time>
          <FirstMessageWrap>
            <UsernameText style={{ margin: "0 10px" }}>
              {comment.nickname}
            </UsernameText>
            <Message
              onDoubleClick= { DoubleClickHandler } 
            >
              {comment.content}
            </Message>
          </FirstMessageWrap>
          <UserInfoImg />
        </SecondMessageWrap>
      </FirstMessageWrap>
    </div>
  );
};

export default Sale;

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

const Message = styled.div`
  color: white;
  padding: 8px 20px;
  border-radius: 40px;
  min-height: 40px;
  background-color: #ff7518;
  display: table-cell;
  vertical-align: middle;
`;
