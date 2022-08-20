import React from 'react'
import styled from "styled-components";
import karrot from "../img/karrotImg.png"

const Footer=() =>{
  return (
    <div>
      <FooterTop>
      <KarrotLogo src={karrot} alt="당근마켓"/>
      <Title>당근마켓∙클론코딩</Title>
      </FooterTop>
      <FooterBottom>
        <p>FE: 김단비 김미리</p>
        <p>BE: 두성한 박민규 최정우</p>
      </FooterBottom>
    </div>
  )
}

export default Footer

const FooterTop=styled.div`
 padding:0 1%;
 display:flex;
  align-items:center;
  margin-left:1%;
`
const KarrotLogo= styled.img`
  width:3%;
  height:3%;
`
const Title=styled.div`
  padding:0 1%;
  font-size:18px;
  color:#d28c0c;
  text-align:left;
  font-weight:bold;
`
const FooterBottom=styled.div`
  font-size:14px;
  text-align:right;
  padding:0 3%
`