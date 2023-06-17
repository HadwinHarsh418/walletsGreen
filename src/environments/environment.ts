// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //API_URL: "https://login.fluidfintec.com/",
  //API_ADMIN_URL: "https://admin.fluidfintec.com/",
  API_URL: "https://apg.api.fluidfintec.com",  //edex-backend KenRoy
  API_ADMIN_URL: "https://apg.api.fluidfintec.com",  //edex-admin-multiapp
  //API_ADMIN_URL: "https://admin.edexpay.net",  //edex-admin-multiapp
  //API_URL: "https://edexpay.net",
  //API_URL: "https://dev.edexpay.net",
  production: false,
  testnet: true,
  horizon: 'https://horizon-testnet.stellar.org',
  // merchants_ids: ['61c1f3b0ab12798ce258c5d0']
  merchants_ids: ['624a913fb929987017bbc244'],
  payrix: {
    merchant:'t1_mer_63776f943208c754fb5fe3c',
    api:'849afecafdcb4b2454ab92237018e4e9'
  }
  
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
