import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { clearComments, __readComments } from "../redux/modules/commentsSlice";
import Buyer from "./Buyer";
import Seller from "./Seller";

const CommentChat = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const detailId = parseInt(param.id);

  useEffect(() => {
    dispatch(__readComments(detailId));
    return () => dispatch(clearComments());
  }, [dispatch]);
  const { comments } = useSelector((state) => state.comments);
  const id = useSelector((state) => state.detail.detail.id);

  return (
    <>
      <CommentChatWrqp>
        {comments.map((comment, index) => {
          if (comment.id !== id) {
            return <Buyer key={index} comment={comment} id={id} />;
          } else {
            return <Seller key={index} comment={comment} id={id} />;
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
