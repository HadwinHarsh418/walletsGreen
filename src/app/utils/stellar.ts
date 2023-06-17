import { StellarAccount, StellarOperation, AccountDataframe } from "@root/interfaces/stellar-account.interface";

export const getBalance = (account: any, asset?: string) => {
    if (asset != undefined) {
        var balance = null;

        console.log(asset, account)
        try {
            balance = account.balances.find(a => a.asset_type === asset).balance
        } catch (error) {
            console.log("No balance for asset = ", asset, account.balances)
            balance = account.balances.find(a => a.asset_type === "native").balance
        }
        console.log(balance)
        //return account.balances.find(a => a.asset_code === asset).balance  //KenRoy
        return balance
    } else {
        return account.balances.find(a => a.asset_type === 'native').balance
    }
}

export const mergeAccountsWithStellarAccounts = (accounts, stellarAccounts, stellarOperations?): Array<AccountDataframe> => {
    let accs: Array<AccountDataframe> = []
    for (let i = 0; i<accounts.length; i++){
        let ops = undefined;
        if (stellarOperations) ops = stellarOperations.find(op => op.account_id === accounts[i].publicKey)
        accs.push({
            info: accounts[i],
            stellar: {
                account: stellarAccounts.find(a => a.account_id === accounts[i].publicKey),
                operations: ops ? ops.operations : []
            }
        })
    }
    return accs;
}


export const filterPaymentOperations = (operations: Array<StellarOperation>): Array<StellarOperation> => {
    return operations.filter(op => op.type === 'payment')
}
