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

interface Location {
  _id: number;
  location_id: number;
  location: string;
  lat: number;
  lng: number;
  px?: number;
  latest_count_date: Date;
}

const packageId = "traffic-volumes-at-intersections-for-all-modes";

async function getPackage() {
  const URL = `/api/3/action/package_show?id=${packageId}`;
  // const URL = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`;

  return await fetch(URL)
    .then((response) => response.json())
    .then((data: CKAN_Response<CKAN_Package>) => {
      return data.result;
    });
}

async function getDatastore<T>(resourceId) {
  const URL = `/api/3/action/datastore_search?id=${resourceId}&limit=10`;
  // const URL = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resourceId}&limit=10000`;

  return await fetch(URL)
    .then((response) => response.json())
    .then((data: CKAN_Response<CKAN_Datastore<T>>) => {
      return data.result;
    });
}

const pkg = await getPackage();

export async function getAllIntersections() {
  let resources = pkg.resources;
  resources = resources.filter((r) => r.datastore_active);

  const locations = resources.find((obj) => {
    return obj.name == "locations";
  });

  const datastore = await getDatastore<Location>(locations.id);

  const records = datastore.records;

  return records;
}

export async function getCountList(location_id: number) {}

export async function getCountData(count_id: number) {}
