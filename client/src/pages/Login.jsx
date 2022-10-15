import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  // const { loading } = useSelector((state) => state.alerts); //select the state
  // console.log("🚀 ~ file: Login.jsx ~ line 12 ~ Login ~ loading", loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("send values of form: ", values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${API_BASE_URL}/api/user/login`,
        values
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
