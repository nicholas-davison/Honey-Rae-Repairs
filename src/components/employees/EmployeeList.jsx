import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.jsx"
import { User } from "../../Users/User.jsx"
import "./Employee.css"
import { Link } from "react-router-dom"

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
                    <Link to={`/employees/${employee.id}`}>
                        < User key={employee.id} user={employee}/>
                    </Link>
                )
            })}
        </div>
    )
}