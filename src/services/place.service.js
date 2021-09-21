import axios from "axios";
import { MAPS_API_URI } from "../helpers/constants";

export const getPlaces = () => axios.get(`${MAPS_API_URI}/place/all`);
