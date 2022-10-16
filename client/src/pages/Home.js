import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Layout from "../components/Layout";

function Home() {
  const [doctors, setDoctors] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/get-user-info-by-id`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Layout>Home</Layout>
    </>
  );
}

export default Home;
