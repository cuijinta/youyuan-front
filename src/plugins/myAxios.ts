import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:8080/api"
});

// 表示在请求是携带凭证（包含cookie）
myAxios.defaults.withCredentials = true;


// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了", config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("我要接受请求了", response)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default myAxios;
