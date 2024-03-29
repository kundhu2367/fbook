export interface IUser {
    id?: string,
    _id?: string,
    firstName: string,
    lastName: string,
    dob: string,
    gender: string,
    email: string,
    profession: string,
    password: string,
    isAdmin?: boolean,
    isActive?: boolean,
    photoId?: string,
    token?: string,
    isNewUser?: boolean,
    isRequested?: boolean,
    isRejected?: boolean,
    status?: string,
    friendIcon?: string,
    friendId?: string,
    userId?: string
}
