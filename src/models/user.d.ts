/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    createTime: Date;
    userStatus: number;
    email: string;
    userRole: number;
    tags: string;
    code: string;
    profile: string;
}