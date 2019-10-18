// const proxy = require("http-proxy-middleware");

// // module.exports = function(app){
// //     app.use(
// //         proxy("/register",{
// //             target:"https://igitur.serveo.net",
// //             secure:false,
// //             changeOrigin:true
// //         })
// //     )
// // }
const proxy = require('http-proxy-middleware');

module.exports = function(app) {

   app.use(proxy('/register', { target: 'https://igitur.serveo.net/' }));

};