import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import CommentChat from "../components/CommentChat";
import ConmmentInput from "./CommentInput";

const Comment = () => {
  return (
    <>
      <ConmmentInput />
      <CommentChat />
    </>
  );
};
export default Comment;
