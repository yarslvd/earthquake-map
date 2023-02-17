export interface pointTypes {
    geometry: {type: string, coordinates: number[]};
    id: string;
    properties: { [key: string]: any };
    type: string;
};