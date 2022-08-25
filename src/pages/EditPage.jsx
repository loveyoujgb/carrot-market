import React from "react";
import Edit from "../components/Edit";
import Layout from "../components/Layout";
import styled from "styled-components";

const EditPage = () => {
  return (
    <Layout>
      <Wrap>
        <Edit />
      </Wrap>
    </Layout>
  );
};
export default EditPage;
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 800px;
  width: 67%;
  box-sizing: border-box;
  margin: 0 auto;
  @media screen and (max-width: 556px) {
    width: 93%;
  }
  @media (min-width: 556px) and (max-width: 800px) {
    width: 85%;
  }
`;
