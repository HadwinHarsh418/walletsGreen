export interface SendPaymentInterface {
    from_account?: string
    to_account: string
    amount: string
    asset: string
}