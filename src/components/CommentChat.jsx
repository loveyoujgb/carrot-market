import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __readComments } from "../redux/modules/commentsSlice";
import Buyer from "./Buyer";
import Seller from "./Seller";

const CommentChat = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const detailId = parseInt(param.id);

  useEffect(() => {
    dispatch(__readComments(detailId));
  }, [dispatch]);
  const { comments } = useSelector((state) => state.comments);
  const username = useSelector((state) => state.detail.detail.username);

  return (
    <>
      <CommentChatWrqp>
        {comments.map((comment, index) => {
          if (comment.username !== username) {
            return <Buyer key={index} comment={comment} username={username} />;
          } else {
            return <Seller key={index} comment={comment} username={username} />;
          }
        })}
      </CommentChatWrqp>
    </>
  );
};
export default CommentChat;

const CommentChatWrqp = styled.div`
  width: 100%;
`;
