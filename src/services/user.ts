// import myAxios from "../plugins/myAxios";
// import { setCurrentUserState } from "../states/user";
//
// export const getCurrentUser = async () => {
//     // const currentUser = getCurrentUserState();
//     // if (currentUser) {
//     //     return currentUser;
//     // }
//     // 不存在则从远程获取
//     const res = await myAxios.get('/user/current');
//     if (res.code === 20000) {
//         setCurrentUserState(res.data);
//         return res.data;
//     }
//     return null;
// }
import myAxios from "../plugins/myAxios";
import { setCurrentUseState } from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code === 20000) {
        setCurrentUseState(res.data);
        return res.data;
    }
    return null;
}


