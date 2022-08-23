//아이디 확인
// export const isLogin = () => {
//   // localStorage.getItem("nickname");
//   localStorage.getItem("token");
// };

//로그아웃
export const Logout = () => {
  // localStorage.removeItem("nickname");
  localStorage.clear();
  window.location.reload();
};

export const IsLogin = localStorage.getItem("token");

// export const Logout = localStorage.removeItem("token");
