import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import manner from "../img/manner.png";
import back from "../img/back.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CgHome } from "react-icons/cg";
import Modal from "./Modals/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import detailSlice, { changeMode, __getDetail, __getUserHeart, __postUserHeart } from "../redux/modules/detailSlice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Detail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  //작성자인지 확인 후 수정 버튼show hide설정
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("token");
  console.log(username);
  // 작성자 확인용 useState
  const [userCheck, setUserCheck] = useState(false);
  //user heart post 하면 아래거 지우기
  const [like, setLike] = useState(false);
  const param = useParams();
  const { userheart, detail, isLoading, error } = useSelector((state) => state.detail);
  // const movie = movies.find((movie) => movie.boardId === parseInt(param.id));
  console.log(param.id);
  console.log(detail);
  useEffect(() => {
    dispatch(__getDetail({ id: param.id })); // 이건가 객체인가.. 확인필요
    // dispatch(__getUserHeart({id: param.id }))
    if (username === null) {
      // 로그인 안한경우
      return;
    } else {
      setUserCheck(true);
    }
    // if (username === detail.username) {
    //   // 로그인 유저정보와, 현재 디테일 창의 작성자와 일치여부 확인
    //   setUserCheck(true); // 작성자다!
    // } else {
    //   return;
    // }
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    // dispatch(__deleteDetail(param.id));
  };
  const onClickEdit = () => {
    // dispatch(changeMode({ mode: true }));
    dispatch(changeMode({ mode: true, id: param.id }));
    navigate("/form");
  };

  const onClickHeart = () => {
    // dispatch(__postUserHeart({id: param.id))
    setLike(!like);
  };

  return (
    <>
      <ViewItemWrap>
        <BackButtonWrap>
          <BackButton
            onClick={() => {
              navigate("/");
            }}
          >
            <MdOutlineArrowBackIos size="25" />
            <CgHome style={{ marginLeft: "10px" }} size="25" />
          </BackButton>
        </BackButtonWrap>
        {/* <StSelect components={{ DropdownIndicator }} onChange={onChangeDetailHandler} value={detailOption}>
          {DetailOptions.map((item, index) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </StSelect> */}
        <FirstWrap>
          <Swiper
            style={{ height: "500px", width: "100%" }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {/* {detail.img.map((photo, index) => (
              <SwiperSlide key={index}>
                <ItemImg back={photo.imgUrl}></ItemImg>
              </SwiperSlide>
            ))} */}
            <SwiperSlide>
              <StDiv>
                <ItemImg back={back}></ItemImg>
              </StDiv>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
        </FirstWrap>
        <UserInfoFirstWrap>
          <UserInfoWrap>
            <UserInfoImg />
            <UerInpo>
              {/* <Username to="/">유저정보</Username> */}
              <Username to="/">{detail.nickname}</Username>
              {/* <UserRegion>주소</UserRegion> */}
              <UserRegion>{detail.region}</UserRegion>
            </UerInpo>
          </UserInfoWrap>
          <MannerImg manner={manner} />
        </UserInfoFirstWrap>
        <ContentWrap>
          <TitleWrap>
            <ContentTitle>{detail.title}</ContentTitle>
            {/* <ContentTitle>위니아 제습기 팝니다.</ContentTitle> */}
            {userCheck ? (
              <ModalButton onClick={openModal}>
                <BiDotsVerticalRounded style={{ cursor: "pointer" }} size="25" />
              </ModalButton>
            ) : null}
            <Modal open={modalOpen} close={closeModal}>
              <main>
                <ButtonInModalWrap>
                  <ButtonInModal onClick={onClickDelete}>삭제하기</ButtonInModal>
                  <ButtonInModal onClick={onClickEdit}>수정하기</ButtonInModal>
                </ButtonInModalWrap>
              </main>
            </Modal>
          </TitleWrap>
          {/* <ContentCategory>생활가전 · 4시간전</ContentCategory> */}
          <ContentCategory>{detail.category}</ContentCategory>
          {/* <ContentPrice>30,000원</ContentPrice> */}
          <ContentPrice>{detail.price}</ContentPrice>
          {/* <ContentContent>작은 집으로 이사가요. 당근톡 고고</ContentContent> */}
          <ContentContent>{detail.content}</ContentContent>
          <LikeWrap>
            {like ? <IoMdHeart color="#ff7518" onClick={onClickHeart} size="25" /> : <IoMdHeartEmpty onClick={onClickHeart} size="25" />}
            {/* {usertHeart ? <IoMdHeart color="#ff7518" onClick={onClickHeart} size="25" /> : <IoMdHeartEmpty onClick={onClickHeart} size="25" />} */}
            <ContentLike>관심120 · 댓글100</ContentLike>
            {/* <ContentLike>관심{detail.heartCnt} · 댓글{detail.commentCnt}</ContentLike> */}
          </LikeWrap>
        </ContentWrap>
      </ViewItemWrap>
    </>
  );
};

export default Detail;

const BackButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #cecece;
`;

const BackButton = styled.div`
  margin-top: 8px;
  cursor: pointer;
`;

const ViewItemWrap = styled.div`
  width: 100%;
`;

const StSelect = styled.select`
  margin: 5px 0;
  color: #696969;
  font-size: 15px;
  border: 1px solid #e9e9e9;
  padding: 10px;
  width: 50px;
  height: 43px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

//Item Image
const FirstWrap = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemImg = styled.div`
  background-image: url(${(props) => props.back});
  /* background-size: contain; */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  width: 80%;
  height: 100%;
  border-radius: 10px;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

//------------------------------------>
//UserInfo
const UserInfoFirstWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9ecef;
`;

const SecondWrap = styled.div``;
const UserInfoWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
`;

const MannerImg = styled.div`
  display: flex;
  display: inline-block;
  background-image: url(${(props) => props.manner});
  background-size: 130px;
  background-repeat: no-repeat;
  background-position: right bottom;
  width: 130px;
  height: 100px;
  margin: 0 10px 20px 0;
`;

const UerInpo = styled.div`
  margin: 0;
  padding: 0;
`;
const UserInfoImg = styled.div`
  background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png");
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;
const UserRegion = styled.div`
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #212529;
`;
const Username = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.6px;
  color: #212529;
`;
//---------------------------------------->
//content
const ContentWrap = styled.div`
  box-sizing: border-box;
  padding: 25px 0;
  border-bottom: 1px solid #e9ecef;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalButton = styled.div`
  background-color: transparent;
  border: none;
`;

const ButtonInModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  align-items: center;
`;

const ButtonInModal = styled.button`
  /* font-weight: bold; */
  border: none;
  border-radius: 5px;
  padding: 5px;
  background-color: transparent;
  :hover {
    font-weight: bolder;
    padding: 1px solid transparent;
  }
`;

const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.6px;
`;
const ContentCategory = styled.div`
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
`;
const ContentPrice = styled.div`
  margin-top: 4px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.76;
  letter-spacing: -0.6px;
`;
const ContentContent = styled.div`
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.6px;
  margin: 16px 0;
  word-break: break-all;
`;

const LikeWrap = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
`;

const ContentLike = styled.div`
  margin-left: 5px;
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
`;
