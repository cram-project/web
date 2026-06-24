import type {LibraryResponse} from "../types/library.ts";
import api from "./axios.ts";

export const getDocuments = async (): Promise<LibraryResponse[]> => {
    const r = await api.get<LibraryResponse[]>("/documents");
    return r.data;
};

export const getDocument = async (id: string): Promise<LibraryResponse> => {
    const r = await api.get<LibraryResponse>(`/documents/${id}`);
    return r.data;
};

export const getDocumentBlob = async (id: string): Promise<Blob> => {
    const r = await api.get(`/documents/${id}/object`, { responseType: "blob" });
    return r.data;
};

export const uploadDocument = async (file: File, title: string): Promise<LibraryResponse> => {
    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    const r = await api.post<LibraryResponse>("/api/v1/upload", form);
    return r.data;
};
