var { myFirebase } = require("../firebase/firebase.js")
import { hashHistory } from "react-router"
var signUpStart = (text) => {
    return {
        type: "SIGNUP",
        text
    }
}
var loginStart = () => {
    return {
        type: "LOGIN"
    }
}
var pullData = (data)=>{
    return {
        type :"PULL_DATA",
        data
    }
}
var searchStart = (data)=>{
    return {
        type:"SEARCH_START",
        data
    }
}

export var signUpAction = (credentials) => {
    return (dispatch, getState) => {
        return myFirebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.pass).then((result) => {
            console.log("auth worked");
            hashHistory.push("/login");
            dispatch(signUpStart(true))
        }).catch((error) => {
            console.log(error.message);
            dispatch(signUpStart(false))
        })
    }
}
export var LoginAction = (credentials) => {
    return (dispatch, getState) => {
        return myFirebase.auth().signInWithEmailAndPassword(credentials.email, credentials.pass).then((result) => {
            dispatch(loginStart())
            hashHistory.push("/register");
        }).catch((error) => {
            alert(error.text);
        })
    }
}
export var pushData = (register) => {
    return (dispatch, getState) => {
        var user = myFirebase.auth().currentUser;
        var uid = user.uid;
        myFirebase.database().ref().child("users/"+register.bloodGroup).push(register)
    }
}

export var pullData = () => {
    return (dispatch, getState) => {
        var user = myFirebase.auth().currentUser;
        var uid = user.uid;
        var dataRef = myFirebase.database().ref().child("users");
        return dataRef.on("value",function(snapshot){
            var todos = snapshot.val() || {}
             var parseData = [];
            Object.keys(todos).forEach((todoId) => {
                parseData.push({
                    ...todos[todoId]
                })
            })
            console.log(parseData)
        })
    }
}
export var searchData =(bloodGroup) =>{
    return (dispatch,getState)=>{
        var bGroup = myFirebase.database().ref().child("users/"+bloodGroup);
        bGroup.once("value",(snapshot)=>{
            var value = snapshot.val();
          var  filteredData = [];
           Object.keys(value).forEach((val)=>{
            filteredData.push({
                ...value[val]
            })
              dispatch(searchStart(filteredData))
           })
           console.log(filteredData,"filteredData")
       
        })
    }
}