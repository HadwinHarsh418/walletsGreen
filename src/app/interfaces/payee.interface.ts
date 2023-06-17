export type Currency = "EUR" & "GBP"


export interface Payee{
    address: string
    name: string
    phone: string
    stellar_payments: Array<any>
}
