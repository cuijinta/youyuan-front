import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    username: string;
    teamAvatarUrl?: string,
    name: string;
    description: string;
    expireTime: Date;
    maxNum: number;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    userId: number;
    createUser?: UserType;
    hasJoinNum?: number;
    hasJoin?:boolean;
    announce?: string;
    user?:UserType;
    UserSet?: UserType[]
}