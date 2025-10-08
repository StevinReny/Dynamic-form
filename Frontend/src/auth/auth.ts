import axios from "axios";

const axiosInstance=axios.create({
  baseURL:"http://localhost:8080",
  withCredentials:true,
})


axiosInstance.interceptors.request.use(function(config){
  const token=localStorage.getItem("accessToken")||null;
  if(token){
    config.headers.Authorization=`Bearer ${token}`;
    
  }
  return config;
},function(error){
  return Promise.reject(error)
});


axiosInstance.interceptors.response.use(function(response){
  return response;
},async function(error){
  const originalRequest=error.config;
    if (originalRequest.url.includes("/user/login")|| originalRequest.url.includes("/refresh")) {
      return Promise.reject(error);
    }
  if(error.response.status===401 && (!originalRequest.retry)){
    originalRequest.retry=true;
   try{
            const {data:result}=await axiosInstance.post("http://localhost:8080/refresh");
            const token=result.accessToken
            if(token){
                localStorage.setItem("accessToken", token);
                console.log("Token from local",localStorage.getItem("accessToken"))
                originalRequest.headers.Authorization=`Bearer ${token}`
                return axiosInstance(originalRequest);

            }
            else{
                throw new Error("No token received from refresh");
            }
        }
        catch{
            await axiosInstance.post("http://localhost:8080/logout");
            localStorage.removeItem('accessToken')
            localStorage.removeItem("user")
            window.location.href='/login';
            return Promise.reject(error);
        }
  }
  return Promise.reject(error)
});

export default axiosInstance;



