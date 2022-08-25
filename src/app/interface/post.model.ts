export interface IPost {
    id?: string,
    post: string,
    userId: string,
    userPhotoId: string,
    postImageId: string,
    userName: string,
    isAdmin: boolean,
    isActive: boolean,
    createdDate?: string,
    postTimer?: string,
    postImage?: string,
    userIcon?: string,
    isPostImage?: boolean,
    isMyPost?: boolean
}
