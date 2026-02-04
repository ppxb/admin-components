import type { AxiosResponse } from 'axios';
import type { RequestInstanceState } from '@/types/request';
import { createFlatRequest } from './axios';
import { getAuthorization } from './utils';

export const request = createFlatRequest(
  {
    baseURL: import.meta.env.VITE_API_URL,
  },
  {
    defaultState: {
      refreshTokenPromise: null,
      errMsgStack: [],
    } as RequestInstanceState,
    transform(response: AxiosResponse<Api.Res<any>>) {
      return response.data.data;
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      return response.data.code === import.meta.env.VITE_BACKEND_SUCCESS_CODE;
    },
    async onBackendFail(_response, _instance) {
      // logout and reset store state
      // open dialog or modal to relogin or else
    },
    onError(_error) {
      // show error message or logout
    },
  },
);
