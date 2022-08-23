import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoToken = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}?code=${code}`)
      .then((res) => {
        const token = res.headers.authorization;
        const username = res.data.username;
        const nickname = res.data.nickname;
        console.log(res);
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("usename", username);
        localStorage.setItem("nickname", nickname);
        alert("로그인 완료!");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("로그인에러", err);
        window.alert("로그인에 실패하였습니다");
        navigate("/");
      });
  };
  useEffect(() => {
    getKakaoToken();
  });
  return null;
}

export default Login;