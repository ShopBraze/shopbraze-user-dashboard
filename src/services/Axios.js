import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

axiosInstance.defaults.headers.post["Content-Type"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const handleGet = async (url, requestParams) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url,
      requestParams,
      // headers:{
      //   Authorization:""
      // }
    });
    if (response?.status === 200) {
      const { data } = response;
      return {
        status: response.status,
        data,
        url,
      };
    }
    throw new Error("Api Handle Get Failed");
  } catch (error) {
    return Promise.reject(error ?? "error");
  }
};

export { handleGet };
