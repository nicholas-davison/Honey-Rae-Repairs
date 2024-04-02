import { useEffect, useState } from "react"
import { CustomerViews } from "./CustomerViews.jsx"
import { EmployeeViews } from "./EmployeeViews.jsx"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])

  return ( currentUser.isStaff ? 
  <EmployeeViews currentUser={currentUser}/>
   : 
   <CustomerViews currentUser={currentUser}/>
)}
