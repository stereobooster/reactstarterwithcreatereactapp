const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.secureHome = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.faq = functions.https.onRequest((req, res) => {
// const path = req.path.split('/')
// const subroute = path[2];
//   res.status(200).end(`<!doctype html>
//     <head>
//       <title>Faq</title>
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content="Faq" />
//       <meta property="og:description" content="test description" />
//       <meta property="og:image" content="http://prettylinks.co/images/ViEm8Fu6pik0twsOD5YigZW2Jf978NHRtiXU01us.jpeg" />
//       <script>window.location.href = 'https://reactstarterwithcreatereactapp.firebaseapp.com/faq/'</script>
//     </head>
//     <body>
//     </body>
//   </html>`)
// });