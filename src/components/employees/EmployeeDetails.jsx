import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Employee.css"
import { getEmployeeByUserId } from "../../services/employeeService"


export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        getEmployeeByUserId(employeeId).then(employeeArr => {
            const employeeObj = employeeArr[0]
            setEmployee(employeeObj)
        })
    }, [])

    return (
        <section className="employee">
            <h2 className="employee-header">{employee.user?.fullName}</h2>
            <div>
                <span className="employee-info">Email :</span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty :</span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate :</span>
                {employee.rate}
            </div>
            <footer className="employee-footer"> Working on {employee.employeeTickets?.length} Tickets</footer>
        </section>
    )
}