import "./App.css"
import { TicketList } from "./components/tickets/TicketList.jsx"
import { CustomerList } from "./components/customers/CustomersList.jsx"
import { EmployeeList } from "./components/employees/EmployeeList.jsx"

export const App = () => {
  return <>
    {/* <TicketList /> */}
    {/* < CustomerList/> */}
    <EmployeeList/>
  </>
}

