import React from "react";

const Signout = () => {
  sessionStorage.clear();
  window.location.href = "/";

  return <></>;
};

export default Signout;
