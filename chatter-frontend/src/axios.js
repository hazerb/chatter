import axios from "axios";

export default function api() {
  var jwtToken = localStorage.getItem("token");
  const defaultConfig = {
    baseURL: "http://localhost:3200/",
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  return axios.create(defaultConfig);
}

//http://ec2-18-157-229-123.eu-central-1.compute.amazonaws.com:8080
