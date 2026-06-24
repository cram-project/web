import type {LibraryResponse} from "../types/library.ts";
import api from "./axios.ts";

export const getDocuments = async (): Promise<LibraryResponse[]> => {
   const r = await api.get<LibraryResponse[]>("/documents");
   return r.data
}
