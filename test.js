// obj = [
//   {
//     event_start: "fds",
//     event_end: "4792332377",
//   },
//   {
//     event_start: "name  ",
//     event_end: "223488844",
//   },
// ];

// str = str.replace(/event_start/g, "start");
// str = str.replace(/event_end/g, "end");

// console.log(str);

// let replaceKeyInObjectArray = (a, r) =>
//   a.map((o) =>
//     Object.keys(o)
//       .map((key) => ({ [r[key] || key]: o[key] }))
//       .reduce((a, b) => Object.assign({}, a, b))
//   );

// const replaceMap = { event_start: "start", event_end: "end" };

// const x = replaceKeyInObjectArray(obj, replaceMap);

// console.log(x);
// let data = [];
// const fun1 = () => {
//   var t = new Promise((resolve) => {
//     setTimeout(() => {
//       data = [1, 2, 3, 4];
//       console.log("fun 1 running wiht 2 sec delay");
//       resolve(data);
//     }, 2000);
//   });
//   return t;
// };

// const fun2 = () => {
//   console.log("fun2");
// };

// const fun3 = async () => {
//   await fun1();
//   // setTimeout(() => {
//   await console.log(data);
//   // }, 3000);
// };

// fun2();
// fun3();

// let newObj = {
//   id: "2",
//   event_start: "new title",
//   event_end: "new end",
//   somtihgSpical: "spical",
// };

// let finalObj = null;

// obj.map((elm, i, y) => {
//   if (elm.id === newObj.id) {
//     y[i] = newObj;
//     finalObj = y;
//   }
// });

// console.log(finalObj);

let obj = [
  {
    event_start: "name  ",
    event_end: "223488844",
    id: "0",
  },
  {
    event_start: "fds",
    event_end: "4792332377",
    id: "1",
  },
  {
    event_start: "name  ",
    event_end: "223488844",
    id: "2",
  },
  {
    event_start: "name  ",
    event_end: "223488844",
    id: "3",
  },
  {
    event_start: "name  ",
    event_end: "223488844",
    id: "4",
  },
];

const id = "3";

obj.map((elm, i, y) => {
  if (elm.id === id) {
    // obj[i].pop;
    obj.splice(i, 1);
    console.log(obj, "log in side");
  } else {
    console.log("no entry with that id found");
  }
});

console.log(obj, "last log");
