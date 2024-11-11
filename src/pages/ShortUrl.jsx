import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortUrl = () => {
  console.log("SHort Url called");
  const { hashvalue } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://url-shortner-backend-8xp1.onrender.com/${hashvalue}`)
      .then((response) => {
        const OrgUrl = response?.data?.OrgUrl;

        if (OrgUrl) {
          window.location.href = OrgUrl;
        }
      })
      .catch((error) => {
        `Error: ${error?.response?.data.message}`;
      });
  }, [hashvalue, navigate]);

  return <div></div>;
};

export default ShortUrl;
