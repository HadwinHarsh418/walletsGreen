export const errorCheck = (response) => {
    if (response.ok) return response
    else throw new Error(response.error)
}
