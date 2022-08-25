import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos, MdAddAPhoto, MdOutlinePostAdd, MdOutlineTune } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { cleartDetail } from "../redux/modules/detailSlice";
import { useDispatch } from "react-redux";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegiont] = useState();
  const [category, setCategory] = useState();
  const [files, setFiles] = useState([]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 20000000, //20메가
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {errors.map((e) => {
        return (
          <div style={{ marginLeft: "10px" }} key={e.code}>
            {e.code}
          </div>
        );
      })}
    </div>
  ));

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <Img
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </Thumb>
  ));

  useEffect(() => {
    if (token === null) {
      navigate("/");
      alert("로그인을 해주세요");
      return;
    }
    return () => {
      dispatch(cleartDetail());
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  const onClickSubmit = async () => {
    let formData = new FormData();
    if (title === "") {
      alert("제목을 입력해 주세요");
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (price === "") {
      alert("가격을 입력해 주세요");
    } else if (region === undefined) {
      alert("지역을 선택해 주세요");
    } else if (category === undefined) {
      alert("카테고리를 선택해 주세요");
    } else if (files.length === 0) {
      alert("사진을 추가해 주세요.");
    } else {
      files.map((file) => formData.append("multipartFile", file));

      const dataSet = {
        title: title,
        region: region,
        category: category,
        price: price,
        content: content,
      };

      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      try {
        const token = localStorage.getItem("token");
        const data = await axios({
          method: "post",
          url: `${API_URL}/article/auth`,
          headers: {
            "Content-Type": "multipart/form-data",
            responseType: "blob",
            Authorization: token,
          },
          data: formData,
        });
        navigate(`/detail/${data.data.id}`);
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
          <Container>
            <input {...getInputProps()} />
            <StButton {...getRootProps()}>
              <MdAddAPhoto size="30px" />
              <Length>{files.length}/5</Length>
            </StButton>
            <ThumbsContainer>{thumbs}</ThumbsContainer>
            <div>{fileRejectionItems}</div>
          </Container>
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
          <AddButton onClick={onClickSubmit}>완료</AddButton>
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
  @media screen and (max-width: 556px) {
    font-size: 13px;
  }
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

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
`;

const Length = styled.span`
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 31px;
`;

const Thumb = styled.div`
  display: inline-flex;
  width: 80px;
  height: 80px;
  padding: 4px;
  box-sizing: border-box;
`;

const Img = styled.img`
  border-radius: 12px;
  display: block;
  width: auto;
  height: 100%;
  margin-left: 5px;
`;

const StButton = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 80px;
  height: 80px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 18px 23px;
  position: relative;
`;
