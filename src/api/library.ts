import type {LibraryResponse} from "../types/library.ts";
import api from "./axios.ts";

const library = async ()=>{
   const r = await api.get<LibraryResponse>("/documents");
   return r.data
}
