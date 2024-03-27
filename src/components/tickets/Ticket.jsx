import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"
import { assignTicket, updateTicket } from "../../services/ticketService.jsx"


export const Ticket = ({ticket, currentUser, getAndSetTickets}) => {

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
    }, [employees, ticket])


    const handleClaim =  () => {

        const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id
        }

         assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }


    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }
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
                <div className="btn-container">
                    {/* if current user is employee, and an employee ticket has been created for current service ticket, display, a
                    button to claim ticket */}
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
                    ) : (
                        ""
                    )}

                    {/* if current user is assigned employee for employeeTicket, and the ticket does not have a completed date, 
                    a button to close ticket */}
                    {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
                        <button className="btn btn-warning" onClick={handleClose}>Close</button>
                    ) : (
                        ""
                    )}
                </div>
            </footer>
      </section>
    )
}