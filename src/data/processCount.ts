import type { CountData } from "src/api/toronto-open-data";

const sumArray = (array: number[]) => {
  return array.reduce((p, c) => p + c, 0);
};

const getPHF = (array: number[]) => {
  const PHF = sumArray(array) / (4 * Math.max(...array));
  return Math.round(PHF * 100) / 100;
};

const TMCKeys = [
  "nb_cars_l",
  "nb_bus_l",
  "nb_truck_l",
  "nb_cars_t",
  "nb_bus_t",
  "nb_truck_t",
  "nb_cars_r",
  "nb_bus_r",
  "nb_truck_r",
  "nx_peds",
  "nx_bike",

  "sb_cars_l",
  "sb_bus_l",
  "sb_truck_l",
  "sb_cars_t",
  "sb_bus_t",
  "sb_truck_t",
  "sb_cars_r",
  "sb_bus_r",
  "sb_truck_r",
  "sx_peds",
  "sx_bike",

  "eb_cars_l",
  "eb_bus_l",
  "eb_truck_l",
  "eb_cars_t",
  "eb_bus_t",
  "eb_truck_t",
  "eb_cars_r",
  "eb_bus_r",
  "eb_truck_r",
  "ex_peds",
  "ex_bike",

  "wb_cars_l",
  "wb_bus_l",
  "wb_truck_l",
  "wb_cars_t",
  "wb_bus_t",
  "wb_truck_t",
  "wb_cars_r",
  "wb_bus_r",
  "wb_truck_r",
  "wx_peds",
  "wx_bike",
];

function calculatePeakHour(countDataList: CountData[]) {
  let countVolumesArray = [];
  countDataList.forEach((obj: Object) => {
    let arr = [];
    for (const key in obj) {
      if (TMCKeys.includes(key)) {
        arr.push(obj[key]);
      }
    }
    countVolumesArray.push(arr);
  });

  const intTotal = countVolumesArray.map((c) => {
    return sumArray(c);
  });

  let PHF = [];
  let hourlyTotals = [];
  for (let i = 0; i < intTotal.length - 3; i++) {
    const hourData = intTotal.slice(i, i + 4);
    PHF.push(getPHF(hourData));
    hourlyTotals.push(sumArray(hourData));
  }

  const peakHourIndex = hourlyTotals.indexOf(Math.max(...hourlyTotals));
  const peakInterval = countDataList.slice(peakHourIndex, peakHourIndex + 4);

  let peakHourData = {
    PHF: PHF[peakHourIndex],
    time_start: countDataList[peakHourIndex].time_start,
  };

  peakInterval.forEach((obj: Object) => {
    for (const key in obj) {
      if (TMCKeys.includes(key)) {
        peakHourData[key] = peakHourData[key] ?? 0;
        peakHourData[key] = peakHourData[key] + obj[key];
      }
    }
  });

  return peakHourData as CountData & { PHF: number };
}

export async function getPeakHourData(countDataList: CountData[]) {
  let AM = [];
  let PM = [];

  countDataList.forEach((c) => {
    let hour = new Date(c.time_start).getHours();
    if (hour < 10) AM.push(c);
    if (hour >= 16) PM.push(c);
  });

  const peakHourAM = calculatePeakHour(AM);
  const peakHourPM = calculatePeakHour(PM);

  return [peakHourAM, peakHourPM];
}
