import { Country } from "./country.interface";
import { Account } from "./account.interface";

export interface User {
    id: string
    accounts: Array<Account>
    contacts: Array<any>
    country: Country
    email: string
    title: string
    firstname: string
    lastname: string
    phone: string
    postcode: string
    user_type: string
}
