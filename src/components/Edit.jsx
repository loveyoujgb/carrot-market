import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos, MdAddAPhoto, MdOutlinePostAdd, MdOutlineTune } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cleartDetail } from "../redux/modules/detailSlice";

const Edit = () => {
  const { detail } = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  const param = useParams();
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [title, setTitle] = useState(detail.title);
  const [content, setContent] = useState(detail.content);
  const [price, setPrice] = useState(detail.price);
  const [region, setRegiont] = useState(detail.region);
  const [category, setCategory] = useState(detail.category);

  useEffect(() => {
    if (id !== detail.id) {
      navigate("/");
      return;
    }
    return () => {
      dispatch(cleartDetail());
    };
  }, []);

  const onClickChangeSubmit = async () => {
    if (title === "") {
      alert("제목을 입력해 주세요");
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (price === "") {
      alert("가격을 입력해 주세요");
    } else if (region === undefined) {
      alert("지역을 선택해 주세요");
    } else if (region === "") {
      alert("지역을 선택해 주세요");
    } else if (category === undefined) {
      alert("카테고리를 선택해 주세요");
    } else if (category === "") {
      alert("카테고리를 선택해 주세요");
    } else {
      let payload = {
        title: title,
        region: region,
        category: category,
        price: price,
        content: content,
      };
      try {
        const token = localStorage.getItem("token");
        await axios({
          method: "patch",
          url: `${API_URL}/article/auth/${param.id}`,
          headers: {
            Authorization: token,
          },
          data: payload,
        });
        navigate(-1);
      } catch (error) {
        return;
      }
    }
  };

  const onChangeTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onChangeContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  const onChangeRegionHandler = (e) => {
    setRegiont(e.currentTarget.value);
  };

  const onChangeCategoryHandler = (e) => {
    setCategory(e.currentTarget.value);
  };

  const RegionOptions = [
    { key: 1, value: "" },
    { key: 2, value: "서울특별시" },
    { key: 3, value: "부산광역시" },
    { key: 4, value: "인천광역시" },
    { key: 5, value: "경기도" },
    { key: 6, value: "강원도" },
  ];

  const onChanePrice = (e) => {
    if (e.target.value.length == 11) return false;
    setPrice(e.target.value);
  };

  const CategoryOptions = [
    { key: 1, value: "" },
    { key: 2, value: "생활가전" },
    { key: 3, value: "생활용품" },
    { key: 4, value: "의류" },
    { key: 5, value: "잡화" },
    { key: 6, value: "디지털기기" },
  ];

  return (
    <>
      <ViewItemWrap>
        <FirstWrap>
          <Title>
            <BackButton
              onClick={() => {
                navigate("/");
              }}
            >
              <MdOutlineArrowBackIos size="25" />
            </BackButton>
          </Title>
          <Input maxLength="30" onChange={onChangeTitleHandler} value={title} placeholder="제목을 입력하세요"></Input>
          <SelectBox>
            <StSelect onChange={onChangeRegionHandler} value={region}>
              {RegionOptions.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value === "" ? "지역을 선택해 주세요!" : item.value}
                </option>
              ))}
            </StSelect>
            <StSelect onChange={onChangeCategoryHandler} value={category}>
              {CategoryOptions.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value === "" ? "카테고리를 선택해 주세요" : item.value}
                </option>
              ))}
            </StSelect>
          </SelectBox>
          <PriceWrap>
            <PriceInput value={price} type="number" onChange={onChanePrice} placeholder="₩ 가격(선택사항)" placeholderTextColor="green"></PriceInput>
            <StPriceView>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</StPriceView>
          </PriceWrap>
          <Textarea
            onChange={onChangeContentHandler}
            value={content}
            cols="50"
            rows="8"
            maxLength="200"
            placeholder="게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있습니다."
          />
          <BottomTextWrap>
            <MdOutlinePostAdd />
            <BottomText>자주 쓰는 문구 </BottomText>
            <MdOutlineTune />
            <BottomText>보여줄 동네 설정</BottomText>
          </BottomTextWrap>
          <AddButton onClick={onClickChangeSubmit}>수정 완료</AddButton>
        </FirstWrap>
      </ViewItemWrap>
    </>
  );
};

export default Edit;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #e9ecef;
`;

const BackButton = styled.div`
  margin: 8px 10px 0 0;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 15px;
  outline: none;
  padding: 30px 15px;
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  border-bottom: 1px solid #e9ecef;
`;

const Textarea = styled.textarea`
  font-size: 15px;
  outline: none;
  padding: 30px 15px;
  width: 100%;
  border: 1px solid transparent;
  border-bottom: 1px solid #e9ecef;
`;

const PriceWrap = styled.div`
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
`;

const StPriceView = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  width: 50%;
`;

const SelectBox = styled.div`
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
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
`;

const ViewItemWrap = styled.div`
  width: 100%;
`;

const FirstWrap = styled.div`
  height: 500px;
`;

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
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ff8a3d;
`;
