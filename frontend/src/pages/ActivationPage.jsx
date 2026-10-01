import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const called = useRef(false);

useEffect(() => {
  if (activation_token && !called.current) {
    called.current = true;
    axios
      .post(`${server}/user/activation`, { activation_token })
      .then((res) => console.log("ACTIVATION OK:", res.data))
      .catch((err) => {
        console.log("ACTIVATION ERROR:", err.response?.data || err.message);
        setError(true);
      });
  }
}, [activation_token]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;