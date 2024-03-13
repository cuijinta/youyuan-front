import {UserType} from "../models/user";

let currentUser: UserType;

const setCurrentUseState = (user: UserType) => {
    currentUser = user;
}

const getCurrentUserState = () : UserType => {
    return currentUser;
}

export {
    setCurrentUseState,
    getCurrentUserState,
}