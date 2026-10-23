import { VehicleKeys, type CountData } from "src/api/toronto-open-data";

const sumArray = (array: number[]) => {
  return array.reduce((p, c) => p + c, 0);
};

const getPHF = (array: number[]) => {
  const PHF = sumArray(array) / (4 * Math.max(...array));
  return Math.round(PHF * 100) / 100;
};

const getTime = (datetime: string) => {
  const date = new Date(datetime);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

function addBlankDataRows(countDataList: CountData[]) {
  const countTimeList: string[] = [];
  for (let h = 4; h < 20; h++) {
    countTimeList.push(`${h}:00`);
    countTimeList.push(`${h}:15`);
    countTimeList.push(`${h}:30`);
    countTimeList.push(`${h}:45`);
  }

  const expandedCountData: { [key: string]: CountData | null } = {};
  countTimeList.forEach((time) => {
    expandedCountData[time] = null;
  });

  countDataList.forEach((obj) => {
    const { start_time } = obj;
    expandedCountData[getTime(start_time)] = obj;
  });

  const expandedCountDataList: (CountData | null)[] = [];
  Object.entries(expandedCountData).forEach(([key, data]) => {
    expandedCountDataList.push(data);
  });

  return expandedCountDataList;
}

function calculatePeakHour(countDataList: CountData[]) {
  const expandedCountDataList = addBlankDataRows(countDataList);

  const countVolumes: number[][] = [];
  Object.entries(expandedCountDataList).forEach(([key, data]) => {
    if (data === null) {
      countVolumes.push([]);
    } else {
      const { location_name, start_time, ...volumes } = data;
      countVolumes.push(Object.values(volumes));
    }
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
  const peakHourStartTime = getTime(expandedCountDataList[peakHourIndex]?.start_time!);
  const peakInterval = expandedCountDataList.slice(peakHourIndex, peakHourIndex + 4);

  let peakHourData = {
    PHF: PHF[peakHourIndex],
    peakHourStartTime: peakHourStartTime,
  } as VehicleKeys & { PHF: number; peakHourStartTime: string };

  peakInterval.forEach((obj) => {
    Object.entries(obj!).forEach(([key, value]) => {
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
    if (hour < 10) AM.push(c);
    if (hour >= 14) PM.push(c);
  });

  const peakHourDataAM = calculatePeakHour(AM);
  const peakHourDataPM = calculatePeakHour(PM);

  return [peakHourDataAM, peakHourDataPM];
}
