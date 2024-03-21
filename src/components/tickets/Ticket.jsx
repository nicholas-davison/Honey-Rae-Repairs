import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"
export const Ticket = ({ticket}) => {

    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})

    //get all employees in and set them in the employee state on initial render only
    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setEmployees(employeesArray)
        })
    }, [])

    //watch for when employees changes (once all employees have been loaded into state) and find the employee whos id 
    // matches the tickets employee ticket employee id
    useEffect(() => {
        const foundEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
        )
        setAssignedEmployee(foundEmployee)
    }, [employees])

    return (
        <section className="ticket" >
        <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info"></div>
                    <div>
                        {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
                    </div>
                </div>
                <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
            </footer>
      </section>
    )
}