export const defaultPicture = "https://qianye-space.oss-cn-hangzhou.aliyuncs.com/girl20240403.png"
export const defaultTeamPicture = "https://qianye-space.oss-cn-hangzhou.aliyuncs.com/youyuan/2024/0410/%E4%B8%93%E4%B8%9A%E5%9B%A2%E9%98%9F.jpg"

export const jsonParseTag = (usersList) => {
    usersList.forEach(user => {
        if (user.tags) {
            user.tags = user.tags ? JSON.parse(user.tags) : '该用户暂未设置';
        }
    })
}