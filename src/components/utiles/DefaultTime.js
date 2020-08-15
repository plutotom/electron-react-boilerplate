// // TODO if getMinyuntes < 10 `0${getMinutes}`
// // TODO make start time -30 mins of end time
// //todo make end time defalut
// // TODO make time spent = starttime - end time
// //TODO clean up file

// var hours = new Date().getHours();
// var minunts = new Date().getMinutes();

// export const startingTime = (hours, minunts) => {
//   minunts = minunts - 30;
//   if (minunts < 0) {
//     hours = hours - 1;
//     minunts = 60 + minunts;
//     return [hours, minunts];
//   } else {
//     return [hours, minunts];
//   }
// };

// // Getting todays date
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, "0");
// var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
// var yyyy = today.getFullYear();
// export var today = yyyy + "-" + mm + "-" + dd;
