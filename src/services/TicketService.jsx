export const getAllTickets = async () => {
   const response = await fetch ("http://localhost:8088/serviceTickets?_embed=employeeTickets")
   const allTickets = response.json()
    return allTickets
}