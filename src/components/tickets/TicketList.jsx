import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.jsx"
import { Ticket } from "./Ticket.jsx"
import { FilterBar } from "./FilterBar.jsx"
import "./Tickets.css"

export const TicketList = ({currentUser}) => {
    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [showOpenOnly, setShowOpenOnly] = useState(false)

//filter what tickets are being displayed by whether or not the current user is staff
    const getAndSetTickets = () => {
      getAllTickets().then(ticketsArray => {
        if (currentUser.isStaff) {
          setAllTickets(ticketsArray)
        }
        else {
          const customerTickets = ticketsArray.filter((ticket) => ticket.userId === currentUser.id)
          setAllTickets(customerTickets)
        }
      })
    }

  useEffect(() => {
    getAndSetTickets()
  }, [currentUser])

  //if show emergency is false, set filtered tickets with all tickets. if it is true, filter all tickets for those where
  //  emergency is true and set filtered tickets with those.  
  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  useEffect(() => {
    const searchedTickets = allTickets.filter((ticket) => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredTickets(searchedTickets)
  }, [searchTerm, allTickets])


useEffect(() => {
  if (showOpenOnly) {
    const openTickets = allTickets.filter((ticket) => ticket.dateCompleted === "")
    setFilteredTickets(openTickets)
  } else {
    setFilteredTickets(allTickets)
  }
}, [showOpenOnly, allTickets])

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <FilterBar 
        setShowEmergencyOnly={setShowEmergencyOnly} 
        setSearchTerm={setSearchTerm} 
        currentUser={currentUser} 
        setShowOpenOnly={setShowOpenOnly}
        />
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return (
            <Ticket ticket={ticketObj} getAndSetTickets={getAndSetTickets} currentUser={currentUser} key={ticketObj.id}/>
          )
        })}
      </article>
    </div>
  )

}