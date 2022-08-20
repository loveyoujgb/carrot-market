import React from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import styled from "styled-components";

const FormPage = () => {
  return (
    <Layout>
      <Wrap>
        <Form />
      </Wrap>
    </Layout>
  );
};
export default FormPage;
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 40%;
  box-sizing: border-box;
  margin: 0 auto;
`;
