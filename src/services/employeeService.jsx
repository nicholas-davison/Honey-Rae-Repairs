export const getAllEmployees = () => {
    return fetch('http://localhost:8088/employees?_expand=user').then((res) => res.json())
}

export const getEmployeeByUserId = async (userId) => {
    const response = await fetch (`http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets`)
    const employee = response.json()
    return employee
}

export const updateEmployee = (employee) => {
    return  fetch(`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(employee)
    }
)}