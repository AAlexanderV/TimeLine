const data = [
  {
    from: "2023-05-30T05:56:28+00:00",
    to: "2023-05-30T05:57:10+00:00",
  },
  {
    from: "2023-05-30T06:01:01+00:00",
    to: "2023-05-30T06:49:31+00:00",
  },
  {
    from: "2023-05-30T07:04:21+00:00",
    to: "2023-05-30T07:05:26+00:00",
  },
  {
    from: "2023-05-30T08:27:42+00:00",
    to: "2023-05-30T08:28:52+00:00",
  },
  {
    from: "2023-05-30T08:29:43+00:00",
    to: "2023-05-30T08:31:28+00:00",
  },
  {
    from: "2023-05-30T10:19:15+00:00",
    to: "2023-05-30T10:21:02+00:00",
  },
  {
    from: "2023-05-30T16:50:26+00:00",
    to: "2023-05-30T16:50:49+00:00",
  },
  {
    from: "2023-05-30T17:03:12+00:00",
    to: "2023-05-30T17:04:24+00:00",
  },
  {
    from: "2023-05-30T17:05:11+00:00",
    to: "2023-05-30T17:05:55+00:00",
  },
  {
    from: "2023-05-30T19:29:46+00:00",
    to: "2023-05-30T19:31:04+00:00",
  },
  {
    from: "2023-05-30T20:42:28+00:00",
    to: "2023-05-30T20:43:31+00:00",
  },
];

// find date 00:00
const year = new Date(data[0].from).getUTCFullYear();
const month = new Date(data[0].from).getUTCMonth();
const date = new Date(data[0].from).getUTCDate();

const midNight = new Date(Date.UTC(year, month, date));

// display visits number
document.getElementById("visits_count").innerText = data.length + " visits";

// display date
const options = {
  weekday: "short",
  month: "short",
  day: "numeric",
};

const monitoredDay = new Date(data[0].from).toLocaleDateString("en-GB", options);
document.getElementById("date").innerText = monitoredDay;

//
const MS_in24Hours = 24 * 60 * 60 * 1000;
const atHomeTimefractions = [];
const walkTimefractions = [];
const dataContainer = document.getElementById("visual_data_container");

for (let i = 0; i < data.length; i++) {
  let atHomeStart = i > 0 ? new Date(data[i - 1].to) : midNight;
  let atHomeEnd = new Date(data[i].from);

  // пустышка
  const emptyFraction = Number(((100 / MS_in24Hours) * (atHomeEnd - atHomeStart)).toFixed(2));
  console.log("emptyFraction: ", emptyFraction);

  const emptiness = document.createElement("div");
  emptiness.classList.add("emptiness");
  emptiness.style.width = emptyFraction + "%";
  dataContainer.appendChild(emptiness);

  // отметка
  let outsideFrom = new Date(data[i].from);
  let outsideTo = new Date(data[i].to);

  const outsideFraction = Number(((100 / MS_in24Hours) * (outsideTo - outsideFrom)).toFixed(2));
  console.log("outsideFraction: ", outsideFraction);

  const markItem = document.createElement("div");
  markItem.classList.add("mark");
  markItem.style.width = outsideFraction + "%";
  const visualItem = document.createElement("div");
  visualItem.classList.add("visual");
  markItem.appendChild(visualItem);
  dataContainer.appendChild(markItem);
}

//

// form gridColumns positions array
// const gridColumns = [];

// const minsInFullday = 24 * 60;
// const fstDate = new Date(data[0].from);

// data.forEach((date) => {
//   const fromDate = new Date(date.from);
//   const minsAfterMidNight = (fromDate - midNight) / 1000 / 60;

//   const absoluteShiftPercent = Number(((100 / minsInFullday) * minsAfterMidNight).toFixed(2));

//   const shiftCoef = gridColumns.reduce(
//     (acc, currentValue) => Number((acc - currentValue).toFixed(2)),
//     absoluteShiftPercent
//   );

//   gridColumns.push(shiftCoef);
// });

// // insert circles into HTML
// const gridContainer = document.getElementById("visual_data_container");
// let gridTemplateColumnsValue = "";

// gridColumns.forEach((percent) => {
//   const markItem = document.createElement("div");
//   markItem.classList.add("mark");

//   gridContainer.appendChild(markItem);

//   gridTemplateColumnsValue += percent + "% ";
// });

// gridContainer.style.gridTemplateColumns = gridTemplateColumnsValue;

// console.log(gridColumns);
