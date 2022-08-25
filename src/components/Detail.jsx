import React, { useEffect, useState } from "react";
import styled from "styled-components";
import manner from "../img/manner.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CgHome } from "react-icons/cg";
import Modal from "./Modals/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleartDetail, __deleteDetail, __getDetail, __getUserHeart, __postUserHeart } from "../redux/modules/detailSlice";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [like, setLike] = useState(false);
  const param = useParams();
  const { detail, isLoading, error } = useSelector((state) => state.detail);
  const price = +detail.price;
  useEffect(() => {
    dispatch(__getDetail(param.id));
    return () => {
      dispatch(cleartDetail());
    };
  }, [dispatch, username]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(__deleteDetail(param.id));
      navigate("/");
    } else {
      return;
    }
  };
  const onClickEdit = () => {
    navigate(`/edit/${param.id}`);
  };

  const onClickHeart = () => {
    if (token) {
      dispatch(__postUserHeart(param.id));
      setLike(!like);
    } else {
      return;
    }
  };

  return (
    <>
      <ViewItemWrap>
        <DetailFirstWrap>
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
          {detail.isSeller ? (
            <ModalButton onClick={openModal}>
              <BiDotsVerticalRounded style={{ marginTop: "12px", cursor: "pointer" }} size="25" />
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
        </DetailFirstWrap>
        <FirstWrap>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {detail.img?.map((photo, index) => (
              <SwiperSlide key={index}>
                <StDiv>
                  <ItemImg back={photo.imgUrl}></ItemImg>
                </StDiv>
              </SwiperSlide>
            ))}
          </Swiper>
        </FirstWrap>
        <UserInfoFirstWrap>
          <UserInfoWrap>
            <UserInfoImg />
            <UerInpo>
              <Username>{detail.nickname}</Username>
              <UserRegion>{detail.region}</UserRegion>
            </UerInpo>
          </UserInfoWrap>
          <MannerImg manner={manner} />
        </UserInfoFirstWrap>
        <ContentWrap>
          <TitleWrap>
            <ContentTitle>{detail.title}</ContentTitle>
          </TitleWrap>
          <ContentCategory>
            {detail.category} · {detail.createAt}
          </ContentCategory>
          <ContentPrice>{price.toLocaleString()}원</ContentPrice>
          <ContentContent>{detail.content}</ContentContent>
          <LikeWrap>
            {detail.like ? <IoMdHeart color="#ff7518" onClick={onClickHeart} size="25" /> : <IoMdHeartEmpty onClick={onClickHeart} size="25" />}
            <ContentLike>
              관심{detail.heartCnt} · 댓글{detail.commentCnt}
            </ContentLike>
          </LikeWrap>
        </ContentWrap>
      </ViewItemWrap>
    </>
  );
};

export default Detail;

const DetailFirstWrap = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #cecece;
`;

const BackButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
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
  height: 470px;
  width: 100%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 556px) {
    height: 300px;
  }
  @media (min-width: 556px) and (max-width: 800px) {
    height: 400px;
  }
  .swiper {
    height: 100%;
    width: 100%;
    @media screen and (max-width: 556px) {
      height: 300px;
    }
    @media (min-width: 556px) and (max-width: 800px) {
      height: 400px;
    }
  }
  .swiper-button-next::after {
    font-size: 20px !important ;
    color: #696969;
  }
  .swiper-button-prev::after {
    font-size: 20px !important ;
    color: #696969;
  }
  .swiper-pagination-bullet-active {
    background-color: #8f8f8f;
  }
`;
const ItemImg = styled.div`
  background-image: url(${(props) => props.back});
  background-size: cover;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  width: 85%;
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
const Username = styled.div`
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
  white-space: pre-line;
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