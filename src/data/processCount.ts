import { VehicleKeys, type CountData } from "src/api/toronto-open-data";

const sumArray = (array: number[]) => {
  return array.reduce((p, c) => p + c, 0);
};

const getPHF = (array: number[]) => {
  const PHF = sumArray(array) / (4 * Math.max(...array));
  return Math.round(PHF * 100) / 100;
};

function calculatePeakHour(countDataList: CountData[]) {
  let countVolumes: number[][] = [];
  countDataList.forEach((obj) => {
    const { location_name, start_time, ...volumes } = obj;
    countVolumes.push(Object.values(volumes));
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
  } as VehicleKeys & { PHF: number };

  peakInterval.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      // Type error for Array.includes, see https://github.com/microsoft/TypeScript/issues/14520
      // @ts-ignore
      if (VehicleKeys.includes(key)) {
        peakHourData[key as keyof VehicleKeys] = (peakHourData[key as keyof VehicleKeys] ?? 0) + value;
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
