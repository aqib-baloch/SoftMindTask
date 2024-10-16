import { Box } from "@mui/system";
import React from "react";

import { useSelector } from "react-redux";
import GlobalButton from "../components/UI/GlobalButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
//   const userName = useSelector((state) =>
//     state.userDetails.users.length > 0 ? state.userDetails.users[0].name : ""
//   );

//   const logoutFunction = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2>Welcome </h2>
      {/* <h2>Welcome {userName}</h2> */}
      <Box sx={{ margin: "50px" }}>
              <GlobalButton title="Log Out"
                //   onClick={logoutFunction}
              />
      </Box>
    </Box>
  );
};

export default Home;
