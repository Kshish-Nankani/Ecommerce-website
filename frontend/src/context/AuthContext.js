import React, { createContext , useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

const [user, SetUser]= useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
})


// then fill the log in data in setUser and save it to the local storage
// when user logged in saved the user data in local storage and 

const login = (userData)=>{
    SetUser(userData);
    localStorage.setItem("userInfo" , JSON.stringify(userData))
}
//when user logged out removed te user info from local storage
const logout = ()=>{
    SetUser(null);
    localStorage.removeItem("userInfo")
}
return(
    <AuthContext.Provider value={{user, login, logout}} >
              {children}
    </AuthContext.Provider>
)
}



