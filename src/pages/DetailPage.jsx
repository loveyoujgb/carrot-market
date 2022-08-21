import React from "react";
import Detail from "../components/Detail";
import Layout from "../components/Layout";
import styled from "styled-components";

const DetailPage = () => {
  return (
    <Layout>
      <ViewPageWrap>
        <Detail />
      </ViewPageWrap>
    </Layout>
  );
};
export default DetailPage;
const ViewPageWrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 40%;
  box-sizing: border-box;
  margin: 0 auto;
`;
