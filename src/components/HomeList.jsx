import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __readLists } from "../redux/modules/listSlice";
import { useNavigate } from "react-router-dom";

const HomeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //전체조회
  useEffect(() => {
    dispatch(__readLists());
  }, [dispatch]);

  const lists = useSelector((state) => state.lists.lists);

  //지역조회
  const [region, setRegion] = useState("");
  const onChangeRegion = (e) => {
    setRegion(e.target.value);
    dispatch(__readLists({ category: category, region: e.target.value }));
  };

  const regionOptions = [
    { key: 1, value: "" },
    { key: 2, value: "서울특별시" },
    { key: 3, value: "부산광역시" },
    { key: 4, value: "인천광역시" },
    { key: 5, value: "경기도" },
    { key: 6, value: "강원도" },
    // { key: 7, value: "충청북도" },
    // { key: 8, value: "충청남도" },
    // { key: 9, value: "전라북도" },
    // { key: 10, value: "전라남도" },
    // { key: 11, value: "경상북도" },
    // { key: 12, value: "경상남도" },
    // { key: 13, value: "제주특별자치도" },
  ];

  //카테고리조회
  const [category, setCategory] = useState("");
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    return dispatch(__readLists({ category: e.target.value, region: region }));
  };

  const categoryOptions = [
    { key: 1, value: "" },
    { key: 2, value: "생활가전" },
    { key: 3, value: "생활용품" },
    { key: 4, value: "의류" },
    { key: 5, value: "잡화" },
    { key: 6, value: "디지털기기" },
  ];

  return (
    <HomeListWrap>
      <HomeListTitle>중고거래 인기매물</HomeListTitle>
      <SelectBox>
        <div>
          <StSelect onChange={onChangeRegion} value={region}>
            {regionOptions.map((region) => (
              <option key={region.key} value={region.value}>
                {region.value === "" ? "지역을 선택해 주세요!" : region.value}
              </option>
            ))}
          </StSelect>
        </div>
        <div>
          <StSelect onChange={onChangeCategory} value={category}>
            {categoryOptions.map((category) => (
              <option key={category.key} value={category.value}>
                {category.value === ""
                  ? "카테고리를 선택해 주세요"
                  : category.value}
              </option>
            ))}
          </StSelect>
        </div>
      </SelectBox>
      <ListWrap>
        {lists?.map((list, idx) => {
          const price = +list.price;
          return (
            <BoxWrap key={idx} onClick={() => navigate(`/detail/${list.id}`)}>
              <ImageBox src={list.img[0].imgUrl} />
              <ContentWrap>
                <BoxContent margin="6px 0">{list.title}</BoxContent>
                <BoxContent margin="2px 0" bold="bold">
                  {price.toLocaleString()}원
                </BoxContent>
                <BoxContent size="0.8rem">
                  <span>{list.region}</span> -
                  <span>{list.category}</span>
                </BoxContent>
                <BoxContent size="0.8rem">
                  <span>관심 {list.heartCnt}</span>∙
                  <span>댓글 {list.commentCnt}</span>
                </BoxContent>
              </ContentWrap>
            </BoxWrap>
          );
        })}
      </ListWrap>
    </HomeListWrap>
  );
};

export default HomeList;

const HomeListWrap = styled.div`
  padding: 7% 0;
  width: 100%;
  background-color: #f8f9fa;
  @media screen and (max-width: 556px) {
    flex-direction: column;
    padding: 30px 0;
  }
`;
const HomeListTitle = styled.h1`
  margin-bottom: 5%;
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 556px) {
    text-align: center;
  }
`;

const SelectBox = styled.div`
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: right;
  margin-right: 15%;
  @media screen and (max-width: 556px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-right: 0px;
    /* justify-content:center; */
  }
`;

const StSelect = styled.select`
  margin: 5px 0;
  color: #696969;
  font-size: 15px;
  border: 1px solid #e9e9e9;
  padding: 10px;
  width: 100%;
  height: 43px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 556px) {
    width: 70%;
  }
`;

const ListWrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 68%;
  margin: 0 auto;
`;
const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageBox = styled.img`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 5px;
  border: 1px solid transparent;
`;
const ContentWrap = styled.div`
  /* margin:5px; */
`;
const BoxContent = styled.div`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
`;
