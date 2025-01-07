const useCookie = (name) => {
  const cookies = document.cookie.split(";");

  const cookie = cookies.filter((item) => {
    const cookieName = item.split("=")[0];

    return cookieName.trim() == name.trim();
  });

  const cookieVal = cookie[0]?.split("=")[1];
  return cookieVal?.trim();
};

export default useCookie;
