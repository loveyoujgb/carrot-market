import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import manner from "../img/manner.png";
import back from "../img/back.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CgHome } from "react-icons/cg";
import Modal from "./Modals/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // const { detailContent, isLoading, error } = useSelector((state) => state.movies);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    // dispatch(__delete());
  };
  const onClickEdit = () => {
    // dispatch(__edit());
  };

  const onClickHeart = () => {
    setHeart(!heart);
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
        <FirstWrap>
          <ItemImg back={back}></ItemImg>
          <SecondWrap></SecondWrap>
        </FirstWrap>
        <UserInfoFirstWrap>
          <UserInfoWrap>
            <UserInfoImg />
            <UerInpo>
              <Username to="/">유저정보</Username>
              <UserRegion>주소</UserRegion>
            </UerInpo>
          </UserInfoWrap>
          <MannerImg manner={manner} />
        </UserInfoFirstWrap>
        <ContentWrap>
          <TitleWrap>
            <ContentTitle>위니아 제습기 팝니다.</ContentTitle>
            <ModalButton onClick={openModal}>
              <BiDotsVerticalRounded style={{ cursor: "pointer" }} size="25" />
            </ModalButton>
            <Modal open={modalOpen} close={closeModal}>
              <main>
                <ButtonInModalWrap>
                  <ButtonInModal onClick={onClickDelete}>삭제하기</ButtonInModal>
                  <ButtonInModal onClick={onClickEdit}>수정하기</ButtonInModal>
                </ButtonInModalWrap>
              </main>
            </Modal>
          </TitleWrap>
          <ContentCategory>생활가전 · 4시간전</ContentCategory>
          <ContentPrice>30,000원</ContentPrice>
          <ContentContent>작은 집으로 이사가요. 당근톡 고고</ContentContent>
          <LikeWrap>
            {heart ? <IoMdHeart color="#ff7518" onClick={onClickHeart} size="25" /> : <IoMdHeartEmpty onClick={onClickHeart} size="25" />}

            <ContentLike>관심120 · 댓글100</ContentLike>
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

//Item Image
const FirstWrap = styled.div`
  height: 400px;
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
