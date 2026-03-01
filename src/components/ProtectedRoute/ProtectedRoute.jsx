import { Navigate } from "react-router-dom"

function ProtectedRoute({children}) {
  if(localStorage.getItem("token")){
    // children Home
    return children
  }else{
    // login
    return <Navigate to={'/login'}/>
  }
}

export default ProtectedRoute