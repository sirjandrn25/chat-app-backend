export const exclude = (data:any,key:string)=>{
    delete data[key]
    return data
}