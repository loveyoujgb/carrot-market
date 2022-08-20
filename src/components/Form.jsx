import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import manner from "../img/manner.png";
import back from "../img/back.png";
import { MdOutlineArrowBackIos, MdAddAPhoto, MdOutlinePostAdd, MdOutlineTune } from "react-icons/md";

const Form = () => {
  const [price, setPrice] = useState("");

  const onChanePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <ViewItemWrap>
        <FirstWrap>
          <Title>
            <MdOutlineArrowBackIos style={{ marginRight: "10px" }} size="25" />
            <div>중고거래 글쓰기</div>
          </Title>
          <AddPhotoButton>
            <MdAddAPhoto size="50px" />
          </AddPhotoButton>
          <div>
            <SecondWrap></SecondWrap>
            <ItemImg back={back}></ItemImg>
          </div>
          <Input placeholder="제목"></Input>
          <PriveWrap>
            <PriceInput value={price} type="number" onChange={onChanePrice} placeholder="₩ 가격(선택사항)" placeholderTextColor="green"></PriceInput>
            <StPriceView>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</StPriceView>
          </PriveWrap>
          <Textarea cols="50" rows="8" maxLength="200" placeholder="게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있습니다." />
          <BottomTextWrap>
            <MdOutlinePostAdd />
            <BottomText>자주 쓰는 문구 </BottomText>
            <MdOutlineTune />
            <BottomText>보여줄 동네 설정</BottomText>
          </BottomTextWrap>
          <AddButton>완료</AddButton>
        </FirstWrap>
      </ViewItemWrap>
    </>
  );
};

export default Form;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;
const Input = styled.input`
  font-size: 15px;
  outline: none;
  padding: 30px 15px;
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  border-bottom: 1px solid #e9ecef;
  /* :focus {
    border: none;
    outline: 1px solid #e9ecef;
  } */
`;
const Textarea = styled.textarea`
  font-size: 15px;
  outline: none;
  padding: 30px 15px;
  width: 100%;
  border: 1px solid transparent;
  border-bottom: 1px solid #e9ecef;
  /* :focus {
    border: none;
    outline: 1px solid #e9ecef;
  } */
`;

const PriveWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  border-bottom: 1px solid #e9ecef;
`;
const PriceInput = styled.input`
  font-size: 15px;
  outline: none;
  padding-left: 2px;
  width: 50%;
  height: 35px;
  border: none;
  /* border-bottom: 1px solid #e9ecef; */
  /* :focus {
    border: none;
    outline: 1px solid #e9ecef;
  } */
`;

const StPriceView = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  /* padding: 30px 15px; */
  width: 50%;
  /* height: 35px; */
`;

const ViewItemWrap = styled.div`
  width: 100%;
`;

//Item Image
const FirstWrap = styled.div`
  height: 500px;
`;
const ItemImg = styled.div`
  background-image: url(${(props) => props.back});
  background-size: cover;
  background-position: center;
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
`;
//------------------------------------>
//UserInfo
const Button = styled.button``;
const AddPhotoButton = styled.button`
  background-color: transparent;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 10px 13px 10px 10px;
`;

const SecondWrap = styled.div``;

//---------------------------------------->
//content
const BottomTextWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e9ecef;
`;
const BottomText = styled.div`
  margin: 15px 10px 15px 5px;
  font-size: 16px;
  font-weight: bold;
`;

const AddButton = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 20px auto;
  font-size: 16px;
  font-weight: bold;
  color: #ff7236;
`;
