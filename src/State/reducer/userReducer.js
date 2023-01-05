const initialState = {
    users:[],
    cardInfo:null,
    page:0,
    totalPages:0
}
const reducer = (state=initialState, action)=>{
      switch(action.type){
        case "set users data":  return {
            ...state,
            users:[...action.payload]
        }
        case "set card info": return {
            ...state,
            cardInfo:action.payload
        }
        case "set current page number": return {
            ...state,
            page:action.payload
        }
        case "set total page number":return {
            ...state,
            totalPages:action.payload
        }
        default:  return state;
      }
}
export default reducer;