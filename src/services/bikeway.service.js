import axios from "axios";
import { MAPS_API_URI } from "../helpers/constants";

export const getBikeways = () => axios.get(`${MAPS_API_URI}/bikeway/all`);
