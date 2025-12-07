import axios from "axios";
import { api_base_url } from "../helper";

// Central axios instance for all API calls
const api = axios.create({
  baseURL: api_base_url,
});

// You can add interceptors here later if needed
export default api;
