import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/UserService"
import { User } from "../../Users/User.jsx"
import "./Customers.css"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then(customerArray => {
            setCustomers(customerArray)
        })
    }, [])

    return (
        <div className="customers">
            {customers.map((customerObj) => {
                return (
                    <User user={customerObj}/>
                )
            })}
        </div>
    )
}