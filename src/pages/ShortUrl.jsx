import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortUrl = () => {
  const { hashvalue } = useParams();
  const navigate = useNavigate();
  console.log("Value:", hashvalue);
  console.log(`http://localhost:3000/${hashvalue}`);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${hashvalue}`)
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
