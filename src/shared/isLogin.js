//로그아웃
export const Logout = () => {
  localStorage.clear();
};

export const IsLogin = localStorage.getItem("token");
