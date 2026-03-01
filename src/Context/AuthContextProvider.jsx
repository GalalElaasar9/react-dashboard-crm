import { createContext, useEffect, useState } from 'react'

export let authContext = createContext() 

export default function AuthContextProvider({children}) {
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const [token , setToken] = useState(()=>localStorage.getItem("token") || null)

  /*
    كلة key خدة نفذة لو مفيش خلاص شيل ال token هنا بقولة لو فى
  */
  useEffect(()=>{
    if(token){
      localStorage.setItem("token" , token)
    }else{
      localStorage.removeItem("token")
    }
  },[token])

  useEffect(()=>{
    if(user){
      localStorage.setItem("user",JSON.stringify(user))
    }else{
      localStorage.removeItem("user")
    }
  },[user])

  function login(userData , token){
    setUser(userData);
    setToken(token)
  }

  function logOut(){
    setUser(null);
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <authContext.Provider value={{ user , token , login , logOut }}>
      {children}
    </authContext.Provider>
  )
}
