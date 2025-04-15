import type { CountData } from "src/api/toronto-open-data";

const sumArray = (array: number[]) => {
  return array.reduce((p, c) => p + c, 0);
};

const getPHF = (array: number[]) => {
  const PHF = sumArray(array) / (4 * Math.max(...array));
  return Math.round(PHF * 100) / 100;
};

type Keys = keyof Omit<CountData, "location_name" | "start_time" | "end_time">;
const VehicleKeys: Keys[] = [
  "n_appr_cars_l",
  "n_appr_bus_l",
  "n_appr_truck_l",
  "n_appr_cars_t",
  "n_appr_bus_t",
  "n_appr_truck_t",
  "n_appr_cars_r",
  "n_appr_bus_r",
  "n_appr_truck_r",

  "s_appr_cars_l",
  "s_appr_bus_l",
  "s_appr_truck_l",
  "s_appr_cars_t",
  "s_appr_bus_t",
  "s_appr_truck_t",
  "s_appr_cars_r",
  "s_appr_bus_r",
  "s_appr_truck_r",

  "e_appr_cars_l",
  "e_appr_bus_l",
  "e_appr_truck_l",
  "e_appr_cars_t",
  "e_appr_bus_t",
  "e_appr_truck_t",
  "e_appr_cars_r",
  "e_appr_bus_r",
  "e_appr_truck_r",

  "w_appr_cars_l",
  "w_appr_bus_l",
  "w_appr_truck_l",
  "w_appr_cars_t",
  "w_appr_bus_t",
  "w_appr_truck_t",
  "w_appr_cars_r",
  "w_appr_bus_r",
  "w_appr_truck_r",
];

function calculatePeakHour(countDataList: CountData[]) {
  let countVolumes: number[][] = [];
  countDataList.forEach((obj) => {
    let arr: number[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      // Type error for Array.includes, see https://github.com/microsoft/TypeScript/issues/14520
      // @ts-ignore
      if (VehicleKeys.includes(key)) {
        arr.push(value);
      }
    });

    countVolumes.push(arr);
  });

  const intTotal = countVolumes.map((c) => {
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
    start_time: countDataList[peakHourIndex].start_time,
  } as CountData & { PHF: number };

  peakInterval.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      // Type error for Array.includes, see https://github.com/microsoft/TypeScript/issues/14520
      // @ts-ignore
      if (VehicleKeys.includes(key)) {
        peakHourData[key as Keys] = (peakHourData[key as Keys] ?? 0) + value;
      }
    });
  });

  return peakHourData;
}

export function getPeakHourData(countDataList: CountData[]) {
  let AM: CountData[] = [];
  let PM: CountData[] = [];

  countDataList.forEach((c) => {
    const start_time = new Date(c.start_time);
    const hour = start_time.getHours();
    const minute = start_time.getMinutes();
    if ((hour == 6 && minute >= 30) || (hour >= 7 && hour < 10) || (hour == 10 && minute < 30)) AM.push(c);
    if (hour >= 14) PM.push(c);
  });

  const peakHourDataAM = calculatePeakHour(AM);
  const peakHourDataPM = calculatePeakHour(PM);

  return [peakHourDataAM, peakHourDataPM];
}
