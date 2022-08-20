import React,{useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeList = () => {
  const [region, setRegion]=useState("")
  const onChangeRegion=(e=>{
    setRegion(e.currentTarget.value)
  })
  console.log(region)

  const regionOptions = [
    { key: 1, value: "지역을 선택하세요" },
    { key: 2, value: "서울특별시" },
    { key: 3, value: "부산광역시" },
    { key: 4, value: "인천광역시" },
    { key: 5, value: "경기도" },
    { key: 6, value: "강원도" },
    { key: 7, value: "충청북도" },
    { key: 8, value: "충청남도" },
    { key: 9, value: "전라북도" },
    { key: 10, value: "전라남도" },
    { key: 11, value: "경상북도" },
    { key: 12, value: "경상남도" },
    { key: 13, value: "제주특별자치도" },
  ];
const [category,setCategory]=useState("");
const onChangeCategory=(e)=>{
  setCategory(e.currentTarget.value)
}
console.log(category)

  const categoryOptions = [
    { key: 1, value: "카테고리를 선택하세요" },
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
        <div className="select">
          <select onChange={onChangeRegion} value={region}>
          {regionOptions.map((region)=>(
            <option key={region.key} value={region.value}>{region.value}</option>
          ))}
          </select>
        </div>
        <div className="select">
          <select onChange={onChangeCategory} value={category}>
           {categoryOptions.map((category)=>(
            <option key={category.key} value={category.value}>{category.value}</option>
           ))}
          </select>
        </div>
      </SelectBox>

      <ListWrap>
        <BoxWrap>
          <ImageBox src="https://dnvefa72aowie.cloudfront.net/origin/article/202208/b4db6186b5ee34b312300b380ef1f8629e4a813c54caf135dea99418625b1d8a.webp?q=82s=300x300t=crop" />
          <ContentWrap>
            <BoxContent margin="6px 0">상품이름</BoxContent>
            <BoxContent margin="2px 0" bold="bold">
              가격
            </BoxContent>
            <BoxContent size="0.8rem">지역</BoxContent>
            <BoxContent size="0.8rem">
              <span>관심 1</span>∙<span>댓글 1</span>
            </BoxContent>
          </ContentWrap>
        </BoxWrap>
        <BoxWrap>
          <ImageBox src="https://dnvefa72aowie.cloudfront.net/origin/article/202208/b4db6186b5ee34b312300b380ef1f8629e4a813c54caf135dea99418625b1d8a.webp?q=82s=300x300t=crop" />
          <ContentWrap>
            <BoxContent margin="6px 0">상품이름</BoxContent>
            <BoxContent margin="2px 0" bold="bold">
              가격
            </BoxContent>
            <BoxContent size="0.8rem">지역</BoxContent>
            <BoxContent size="0.8rem">
              <span>관심 1</span>∙<span>댓글 1</span>
            </BoxContent>
          </ContentWrap>
        </BoxWrap>
        <BoxWrap>
          <ImageBox src="https://dnvefa72aowie.cloudfront.net/origin/article/202208/b4db6186b5ee34b312300b380ef1f8629e4a813c54caf135dea99418625b1d8a.webp?q=82s=300x300t=crop" />
          <ContentWrap>
            <BoxContent margin="6px 0">상품이름</BoxContent>
            <BoxContent margin="2px 0" bold="bold">
              가격
            </BoxContent>
            <BoxContent size="0.8rem">지역</BoxContent>
            <BoxContent size="0.8rem">
              <span>관심 1</span>∙<span>댓글 1</span>
            </BoxContent>
          </ContentWrap>
        </BoxWrap>
        <BoxWrap>
          <ImageBox src="https://dnvefa72aowie.cloudfront.net/origin/article/202208/b4db6186b5ee34b312300b380ef1f8629e4a813c54caf135dea99418625b1d8a.webp?q=82s=300x300t=crop" />
          <ContentWrap>
            <BoxContent margin="6px 0">상품이름</BoxContent>
            <BoxContent margin="2px 0" bold="bold">
              가격
            </BoxContent>
            <BoxContent size="0.8rem">지역</BoxContent>
            <BoxContent size="0.8rem">
              <span>관심 1</span>∙<span>댓글 1</span>
            </BoxContent>
          </ContentWrap>
        </BoxWrap>
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
  display: flex;
  justify-content: right;
  margin-right: 15%;
  margin-bottom: 2%;
  gap: 10px;
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
