import Axios, { AxiosResponse } from 'axios';

export default class BaseService<T> {
  public apiUrl: string;

  constructor(controller: string) {
    this.apiUrl = process.env.REACT_APP_API_URL + controller + '/';
  }

  public async getAll(): Promise<AxiosResponse<T[]>> {
    return Axios.get(`${this.apiUrl}`);
  }

  public async getById(id: string | number): Promise<AxiosResponse<T>> {
    return Axios.get(this.apiUrl + id);
  }

  public async delete(id: string | number): Promise<AxiosResponse<T>> {
    return Axios.delete(this.apiUrl + id);
  }

  public async post(data: T): Promise<AxiosResponse<T>> {
    return Axios.post(this.apiUrl, data);
  }

  public async put(id: string | number, data: T): Promise<AxiosResponse<T>> {
    return Axios.put(this.apiUrl + id, data);
  }
}