interface CKAN_Response<T> {
  result: T;
}

interface CKAN_Package {
  resources: {
    datastore_active: boolean;
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

interface Location {
  location_id: number;
  location: string;
  lat: number;
  lng: number;
  px?: number;
  latest_count_date: string;
}

export interface CountMetadata {
  count_id: number;
  count_date: string;
}

export interface CountData {
  location: string;

  time_start: string;
  time_end: string;

  nb_cars_l: number;
  nb_bus_l: number;
  nb_truck_l: number;
  nb_cars_t: number;
  nb_bus_t: number;
  nb_truck_t: number;
  nb_cars_r: number;
  nb_bus_r: number;
  nb_truck_r: number;
  nx_peds: number;
  nx_bike: number;

  sb_cars_l: number;
  sb_bus_l: number;
  sb_truck_l: number;
  sb_cars_t: number;
  sb_bus_t: number;
  sb_truck_t: number;
  sb_cars_r: number;
  sb_bus_r: number;
  sb_truck_r: number;
  sx_peds: number;
  sx_bike: number;

  eb_cars_l: number;
  eb_bus_l: number;
  eb_truck_l: number;
  eb_cars_t: number;
  eb_bus_t: number;
  eb_truck_t: number;
  eb_cars_r: number;
  eb_bus_r: number;
  eb_truck_r: number;
  ex_peds: number;
  ex_bike: number;

  wb_cars_l: number;
  wb_bus_l: number;
  wb_truck_l: number;
  wb_cars_t: number;
  wb_bus_t: number;
  wb_truck_t: number;
  wb_cars_r: number;
  wb_bus_r: number;
  wb_truck_r: number;
  wx_peds: number;
  wx_bike: number;
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
    limit: 10000, // Toronto has about 5800 locations
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

export async function getAllIntersections() {
  const locations = resources.find((obj) => {
    return obj.name == "locations";
  });

  const fields = ["location_id", "location", "lat", "lng", "px", "latest_count_date"];
  const datastore = await getDatastore<Location>(locations.id, {}, fields);
  return datastore.records;
}

export async function getCountList(location_id: number) {
  const count_list = resources.find((obj) => {
    return obj.name == "count_metadata";
  });

  const filters = {
    location_id: location_id,
  };
  const fields = ["count_id", "count_date"];
  const datastore = await getDatastore<CountMetadata>(count_list.id, filters, fields);

  return datastore.records;
}

export async function getCountData(count_id: number, count_date: string) {
  const decade1 = parseInt(count_date.substring(0, 3).concat("0"));
  const decade2 = decade1 + 9;

  const count_list = resources.find((obj) => {
    return obj.name == ["raw-data", decade1, decade2].join("-");
  });

  const filters = {
    count_id: count_id,
  };
  const datastore = await getDatastore<CountData>(count_list.id, filters);
  return datastore.records;
}
