//๋ก๊ทธ์์
export const Logout = () => {
  localStorage.clear();
};

export const IsLogin = localStorage.getItem("token");
