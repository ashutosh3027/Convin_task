export const setUsersData= (usersData)=>{
    return (dispatch)=>{
          dispatch({
            type:'set users data',
            payload:usersData
          })
    }
}
export const setCardInfo = (userData)=>{
    return (dispatch)=>{
        dispatch({
          type:'set card info',
          payload:userData
        })
   }
}

export const setPage = (page)=>{
    return (dispatch)=>{
        dispatch({
          type:'set current page number',
          payload:page
        })
    }
} 

export const setTotalPages = (totalPages)=>{
    return (dispatch)=>{
        dispatch({
          type:'set total page number',
          payload:totalPages
        })
    }
}