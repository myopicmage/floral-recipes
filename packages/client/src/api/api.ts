import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import { RootState } from "src/redux";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).app.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
