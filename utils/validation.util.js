export const getErrorMessages =(error)=>{
    return error.details.map((item)=>{
        return {field:item.path.toString(),message:item.message}
    })
};
  