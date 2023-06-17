export type Currency = "EUR" & "GBP"


export interface Account{
    publicKey: string
    name: string
    type: string
    status: string
    currency: Currency,
    stellar_balance: any,
    stellar_payments: Array<any>
}
