import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const api = axios.create({
  baseURL: "https://shopvera-mern-ecommerence-backend.onrender.com",
  withCredentials: true, // automatically send cookies for all requests
});


const handleError = (error) => {
  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Message:", error.response.data);
    toast.error(error.response.data?.msg || "Something went wrong");
  } else if (error.request) {
    console.log("No response received");
    toast.error("No response from server");
  } else {
    console.log("Error:", error.message);
    toast.error(error.message);
  }
};


export const fetchDetail = async (params) => {
  try {
    const response = await api.get(`/detail/${params.id}/${params.category}`);
    console.log("fetchDetail:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchData = async () => {
  try {
    const response = await api.get("/data");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const Register = async (formData) => {
  try {
    const response = await api.post("/user/register", formData);
    console.log("Register:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = (formData, navigate) => {
  return (async () => {
    try {
      const response = await api.post("/user/login", formData);
      console.log("loginUser:", response.data);

      if (response.data) {
        toast.success("You are successfully logged in!");
        if (navigate) navigate("/cart"); // redirect after login
      }

      return response.data;
    } catch (error) {
      handleError(error);
    }
  })();
};

export const fetchProducts = async () => {
  try {
    const response = await api.get("/user/products");
    console.log("fetchProducts:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/user/registeredUser");
    console.log("fetchUsers:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const RegisterProduct = async (formData) => {
  try {
    const response = await api.post("/user/registerProduct", formData);
    console.log("RegisterProduct:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete("/user/deleteProduct", { data: { id } });
    console.log("deleteProduct:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await api.patch("/user/updateProduct", product);
    console.log("updateProduct:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};