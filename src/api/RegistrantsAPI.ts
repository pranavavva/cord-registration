import axios, { AxiosResponse } from "axios";
import IRegistrant from "../models/IRegistrant";

interface RegistrantAPIParams {
    age: number,
    email: string,
    firstName: string,
    lastName: string,
    registrationDate: string
}

export function getRegistrants(): Promise<AxiosResponse<IRegistrant[]>> {
    return axios.get("/api/registrants");
}

export function createRegistrant(params: RegistrantAPIParams): Promise<AxiosResponse<IRegistrant>> {
    return axios.post("/api/registrants", null, {
        params: params
    });
}

export function getRegistrantById(registrantId: number): Promise<AxiosResponse<IRegistrant>> {
    return axios.get(`/api/registrants/${registrantId}`);
}

export function updateRegistrantById(id: number, params: RegistrantAPIParams): Promise<AxiosResponse<void>> {
    return axios.put(`/api/registrants/${id}`, null, {
        params: params
    });
}

export function deleteRegistrantById(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`/api/registrants/${id}`);
}
