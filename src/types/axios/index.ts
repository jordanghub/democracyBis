import { AxiosRequestConfig } from 'axios';

export interface ICustomAxiosConfig extends AxiosRequestConfig {
  redirectOnFailure?: boolean;
}
