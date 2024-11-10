import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortUrl = () => {
  const { hashvalue } = useParams();
  const navigate = useNavigate();
  console.log("Value:", hashvalue);
  console.log(`https://url-shortner-backend-8xp1.onrender.com/${hashvalue}`);

  useEffect(() => {
    axios
      .get(`https://url-shortner-backend-8xp1.onrender.com/${hashvalue}`)
      .then((response) => {
        console.log("Get Url:", response?.data);
        const OrgUrl = response?.data?.OrgUrl;
        console.log("ooo:", OrgUrl);

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
