export enum UserEnum {
    Male = 1,
    Female = 0,
}

export enum UserRoleEnum {
    Not_ADMIN,
    ADMIN
}

export enum UserStatus {
    Normal,// 正常
    Seal, // 封号
}


const gender = [
    {text: '男', value: 1},
    {text: '女', value: 0},
];

const role = [
    {text: '普通用户', value: 0},
    {text: '管理员', value: 1},
];


const roleId = {
    "普通用户": 0,
    "管理员": 1
}

const genderId = {
    "男": 1,
    "女": 0
}
export {
    gender, genderId, roleId, role
}