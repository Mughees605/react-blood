export var signUpReducer = (state = {},action)=>{
    switch(action.type){
        case "SIGNUP":
        var newState = Object.assign({},state,{isSign:action.text})
        return newState;
        case "LOGIN":
        return "succecfully login"
        default:
        return state
    }
}
export var fetchData = (state = [],action)=>{
    switch(action.type){
        case "SEARCH_START":
       
        return [
            action.data
        ];
        default:
        return state
    }
}