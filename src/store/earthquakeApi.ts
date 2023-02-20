import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const earthquakeApi = createApi({
    reducerPath: 'earthquakeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary'}),
    endpoints: (build) => ({
        getEarthquakes: build.query<any, string>({
            query: (parameter) => `${parameter}`,
        })
    })
});

export const { useGetEarthquakesQuery } = earthquakeApi;