import axios from "axios";
import {showFailToast} from "vant";

const myAxios = axios.create({
    // baseURL: "http://localhost:8888/api"
 // baseURL: "http://192.168.1.178:8888/api" //多设备调试用
 baseURL: "http://47.97.179.125:8888/api" //线上地址
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
    if (response?.data?.code === 40100) {
        showFailToast("请先登录~");
        setTimeout(() => {
            const redirectUrl = window.location.href;
            window.location.href = `/user/login?redirect=${redirectUrl}`;
        }, 800);
        // const redirectUrl = window.location.href;
        // window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default myAxios;
