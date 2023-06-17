import { Account } from './account.interface';

export interface StellarBalance {
    balance: string,
    buying_liabilities: string,
    selling_liabilities: string,
    asset_type: string,

    limit?: string,
    asset_code?: string,
    asset_issuer?: string
}

export interface StellarSigner {
    publicKey: string,
    weight: number,
    key: string,
    type: string
}

export interface StellarAccount {
    id: string,
    paging_token: string,
    account_id: string,
    sequence: string,
    subentry_count: number,
    thresholds: {
        low_threshold: number,
        med_threshold: number,
        high_threshold: number
    },
    flags: {
        auth_required: boolean,
        auth_revocable: boolean,
        auth_immutable: boolean
    },
    balances: Array<StellarBalance>,
    signers: Array<StellarSigner>,
    data: any
}


export interface StellarOperation{

    // base fields
    id: string
    paging_token: string
    source_account: string
    type: string
    type_i: number,
    created_at: string
    transaction_hash: string

    // create account fields ONLY
    starting_balance?: string
    funder?: string
    account?: string

    // change trust fields AND payment fields
    asset_type?: string,
    asset_code?: string,
    asset_issuer?: string,

    // change trust fields ONLY
    limit?: string,
    trustee?: string,
    trustor?: string,

    // payment fields ONLY
    from?: string,
    to?: string,
    amount?: string

}


export interface AccountDataframe {
    info: Account
    stellar: {
        account: StellarAccount
        operations?: Array<StellarOperation>
    }
}

export interface AccountId {
    id : string
}
