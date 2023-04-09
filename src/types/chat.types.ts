export interface ChatBaseInterface {
    id?:number
    title?:string
    created_at?:string,
    is_group?:boolean
}

export interface ChatUserInterface {
    id?:number
    user_id:number
   
}

export interface CreateChatInterface extends ChatBaseInterface {
    users:ChatUserInterface[],
    admin_users:ChatUserInterface[]
}