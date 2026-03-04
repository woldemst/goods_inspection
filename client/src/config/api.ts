import { Platform } from "react-native";

const HOST = Platform.OS === "web" ? "localhost" : "192.168.178.44"; // mac
// const HOST = "localhost";
export const API_BASE_URL = `http://${HOST}:3001/api`;
