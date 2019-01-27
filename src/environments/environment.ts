// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    baseUrl: 'https://problemwithproducts.firebaseio.com/',
    registrationUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    loginUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
    apiKey: "AIzaSyA7j_yHlIpkwqq49i0zvuZtDfa3er_9HCg",
    authDomain: "problemwithproducts.firebaseapp.com",
    databaseURL: "https://problemwithproducts.firebaseio.com",
    projectId: "problemwithproducts",
    storageBucket: "problemwithproducts.appspot.com",
    messagingSenderId: "283149875508"


  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
