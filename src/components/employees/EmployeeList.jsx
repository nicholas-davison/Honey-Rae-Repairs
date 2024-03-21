import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.jsx"
import { User } from "../../Users/User.jsx"
import "./Employee.css"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((staff) => {
            setEmployees(staff)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map((employee) => {
                return (
                    < User user={employee}/>
                )
            })}
        </div>
    )
}