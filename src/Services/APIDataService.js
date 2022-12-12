import { fetchAPI, FetchTypes } from "./FetchUtils";

export const dataUrl =  'http://localhost:3001';

const APIDataService = {

    // ************* API Messaging *************

    info: (message) => fetchAPI(`${dataUrl}/info?message=${message}`, FetchTypes.GET),
    success: (message) => fetchAPI(`${dataUrl}/success?message=${message}`, FetchTypes.GET),
    warning: (message) => fetchAPI(`${dataUrl}/warning?message=${message}`, FetchTypes.GET),
    error: (message) => fetchAPI(`${dataUrl}/error?message=${message}`, FetchTypes.GET),
}

export default APIDataService;