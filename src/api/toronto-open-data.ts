interface CKAN_Response<T> {
  result: T;
}

interface CKAN_Package {
  resources: {
    datastore_active: boolean;
    datastore_cache_last_update: string;
    name: string;
    id: string;
  }[];
}

interface CKAN_Datastore<T> {
  total: number;
  records: T[];
}

interface DatastoreInfo {
  meta: {
    count: number;
  };
}

export interface CountMetadata {
  count_id: number;
  count_date: string;
  location_name: string;
  latitude: number;
  longitude: number;
  px: number;
  am_peak_start: string;
  pm_peak_start: string;
}

export interface LatestCountMetadata extends Omit<CountMetadata, "count_id" | "count_date"> {
  latest_count_id: number;
  latest_count_date: string;
}

export interface CountData {
  location_name: string;

  start_time: string;
  end_time: string;

  n_appr_cars_l: number;
  n_appr_bus_l: number;
  n_appr_truck_l: number;
  n_appr_cars_t: number;
  n_appr_bus_t: number;
  n_appr_truck_t: number;
  n_appr_cars_r: number;
  n_appr_bus_r: number;
  n_appr_truck_r: number;
  n_appr_peds: number;
  n_appr_bike: number;

  s_appr_cars_l: number;
  s_appr_bus_l: number;
  s_appr_truck_l: number;
  s_appr_cars_t: number;
  s_appr_bus_t: number;
  s_appr_truck_t: number;
  s_appr_cars_r: number;
  s_appr_bus_r: number;
  s_appr_truck_r: number;
  s_appr_peds: number;
  s_appr_bike: number;

  e_appr_cars_l: number;
  e_appr_bus_l: number;
  e_appr_truck_l: number;
  e_appr_cars_t: number;
  e_appr_bus_t: number;
  e_appr_truck_t: number;
  e_appr_cars_r: number;
  e_appr_bus_r: number;
  e_appr_truck_r: number;
  e_appr_peds: number;
  e_appr_bike: number;

  w_appr_cars_l: number;
  w_appr_bus_l: number;
  w_appr_truck_l: number;
  w_appr_cars_t: number;
  w_appr_bus_t: number;
  w_appr_truck_t: number;
  w_appr_cars_r: number;
  w_appr_bus_r: number;
  w_appr_truck_r: number;
  w_appr_peds: number;
  w_appr_bike: number;
}

const packageId = "traffic-volumes-at-intersections-for-all-modes";

const proxyCORS = (url: string) => {
  if (import.meta.env.DEV) {
    return url; // Use Vite proxy
  }
  return "https://cors-proxy-uwrykhf2ba-pd.a.run.app/".concat("https://ckan0.cf.opendata.inter.prod-toronto.ca", url);
};

async function getPackage() {
  const URL = proxyCORS(`/api/3/action/package_show?id=${packageId}`);

  return await fetch(URL)
    .then((response) => response.json())
    .then((data: CKAN_Response<CKAN_Package>) => {
      return data.result.resources.filter((r) => r.datastore_active);
    });
}

async function getDatastoreInfo(resource_id: string) {
  const URL = proxyCORS(`/api/3/action/datastore_info`);

  const body = {
    resource_id: resource_id,
  };

  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch(URL, request)
    .then((response) => response.json())
    .then((data: CKAN_Response<DatastoreInfo>) => {
      return data.result;
    });
}

async function getDatastore<T>(resource_id: string, filters?: {}, fields?: string[]) {
  const URL = proxyCORS(`/api/3/action/datastore_search`);

  const body = {
    resource_id: resource_id,
    limit: 10000, // Toronto has about 6200 locations as of Feb 2025
    filters: filters,
    fields: fields,
  };

  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch(URL, request)
    .then((response) => response.json())
    .then((data: CKAN_Response<CKAN_Datastore<T>>) => {
      return data.result;
    });
}

const resources = await getPackage();

export function getUpdateDate() {
  const summary = resources.find((obj) => {
    return obj.name == "tmc_most_recent_summary_data";
  });
  const updateDate = new Date(summary!.datastore_cache_last_update).toLocaleDateString("en-ca");
  return updateDate;
}

export async function getLatestMetadata() {
  const summary = resources.find((obj) => {
    return obj.name == "tmc_most_recent_summary_data";
  });

  const fields: (keyof LatestCountMetadata)[] = ["latest_count_id", "latest_count_date", "location_name", "latitude", "longitude", "px", "am_peak_start", "pm_peak_start"];
  const datastore = await getDatastore<LatestCountMetadata>(summary!.id, {}, fields);
  return datastore.records;
}

export async function getCountList(location_name: string) {
  const summary = resources.find((obj) => {
    return obj.name == "tmc_summary_data";
  });

  const filters: Partial<CountMetadata> = {
    location_name: location_name,
  };
  const fields: (keyof CountMetadata)[] = ["count_id", "count_date", "location_name", "latitude", "longitude", "px", "am_peak_start", "pm_peak_start"];
  const datastore = await getDatastore<CountMetadata>(summary!.id, filters, fields);

  return datastore.records;
}

export async function getCountData(count_id: number, count_date: string) {
  const decade = parseInt(count_date.substring(0, 3).concat("0"));

  const count_list = resources.find((obj) => {
    return obj.name.startsWith(`tmc_raw_data_${decade}`);
  });

  const filters: Partial<CountMetadata> = {
    count_id: count_id,
  };
  const datastore = await getDatastore<CountData>(count_list!.id, filters);
  if (datastore.records.length == 0) throw new Error(`No data found for count_id ${count_id} in ${count_list!.name}`);
  return datastore.records;
}
