import myAxios from "../plugins/myAxios.ts";
import {setCurrentUseState} from "../states/user.ts";

/**
 * 封装获取当前用户的方法
 */
export const getCurrentUser = async () => {

    //请求获取当前用户
    const res =  await myAxios.get('/user/current');
    if(res.code === 20000) {
        setCurrentUseState(res.data); //把请求到的当前用户保存到缓存中
    }
    return res.data;
}
