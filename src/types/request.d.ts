import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';

export type ResponseTransform<Input = any, Output = any> = (
  input: Input,
) => Output | Promise<Output>;

export interface RequestOption<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * 默认状态
   */
  defaultState?: State;

  /**
   * 将响应数据转换为接口层数据
   */
  transform: ResponseTransform<AxiosResponse<ResponseData>, ApiData>;

  /**
   * 将响应数据转换为接口层数据
   *
   * @deprecated will remove in next major version
   */
  transformBackendResponse: ResponseTransform<
    AxiosResponse<ResponseData>,
    ApiData
  >;

  /**
   * 请求前置钩子函数
   */
  onRequest: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

  /**
   * 校验后端响应结果是否成功的钩子函数
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;

  /**
   * 后端请求失败后的钩子函数
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance,
  ) => Promise<AxiosResponse | null> | Promise<void>;

  /**
   * 错误处理钩子
   */
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  stream: ReadableStream<Uint8Array>;
  document: Document;
}

export type ResponseType = keyof ResponseMap | 'json';

export type MappedType<
  R extends ResponseType,
  JsonType = any,
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export type CustomAxiosRequestConfig<R extends ResponseType = 'json'> = Omit<
  AxiosRequestConfig,
  'responseType'
> & {
  responseType?: R;
};

export interface RequestInstanceCommon<State extends Record<string, unknown>> {
  /**
   * 取消所有请求
   *
   * 若请求通过配置项传入了中止控制器标识，则该请求不会被纳入中止控制器的映射表中管理
   */
  cancelAllRequest: () => void;

  /**
   * 可在请求实例中设置自定义状态
   */
  state: State;
}

export interface RequestInstance<
  ApiData,
  State extends Record<string, unknown>,
> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>,
  ): Promise<MappedType<R, T>>;
}

export interface FlatResponseSuccessData<ResponseData, ApiData> {
  data: ApiData;
  error: null;
  response: AxiosResponse<ResponseData>;
}

export interface FlatResponseFailData<ResponseData> {
  data: null;
  error: AxiosError<ResponseData>;
  response: AxiosResponse<ResponseData>;
}

export type FlatResponseData<ResponseData, ApiData> =
  | FlatResponseSuccessData<ResponseData, ApiData>
  | FlatResponseFailData<ResponseData>;

export interface FlatRequestInstance<
  ResponseData,
  ApiData,
  State extends Record<string, unknown>,
> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>,
  ): Promise<FlatResponseData<ResponseData, MappedType<R, T>>>;
}

export interface RequestInstanceState {
  refreshTokenPromise: Promise<boolean> | null;
  errMsgStack: string[];
  [key: string]: unknown;
}
