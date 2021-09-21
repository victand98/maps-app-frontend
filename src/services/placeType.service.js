import axios from "axios";
import { MAPS_API_URI } from "../helpers/constants";

export const getPlaceTypes = () => axios.get(`${MAPS_API_URI}/place-type/all`);
