import {genderMap, roleMap, userStatus} from "./userMap";
/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: genderMap;
    phone: string;
    createTime: Date;
    userStatus: userStatus;
    email: string;
    userRole: roleMap;
    tags: string[];
    code: string;
    profile: string;
    teamIds: string[];
    userIds: string[];
}