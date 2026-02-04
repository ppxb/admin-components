import type {
  AxiosHeaderValue,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ResponseType } from '@/types/request';

/**
 * 获取请求的 Content-Type
 * @param config Axios 配置对象
 */
export function getContentType(config: InternalAxiosRequestConfig) {
  const contentType: AxiosHeaderValue =
    config.headers['Content-Type'] || 'application/json';
  return contentType;
}

/**
 * 判断 HTTP 请求的响应状态码是否为成功状态
 * @param status HTTP 响应状态码
 */
export function isHttpSuccess(status: number) {
  return (status >= 200 && status < 300) || status === 304;
}

/**
 * 判断 Axios 响应数据是否为 JSON 格式
 * @param response Axios 响应对象
 */
export function isResponseJson(response: AxiosResponse) {
  const { responseType } = response.config ?? {};
  return responseType === 'json' || responseType === undefined;
}

/**
 * 统一转换非 JSON 类型的 Axios 响应数据为 JSON 格式
 * @param response Axios 响应对象
 */
export async function transformResponse(response: AxiosResponse) {
  const responseType =
    (response.config?.responseType as ResponseType) ?? 'json';
  const contentType = (response.headers?.['Content-Type'] as string) ?? '';

  if (responseType === 'json' || contentType.includes('application/json')) {
    return;
  }

  if (responseType === 'blob') {
    await transformBlobToJson(response);
  }
  if (responseType === 'arrayBuffer') {
    await transformArrayBufferToJson(response);
  }
}

/**
 * 将 Axios 响应中的 Blob 类型数据解析为 JSON
 * @param response Axios 响应对象
 */
export async function transformBlobToJson(response: AxiosResponse) {
  try {
    const { data } = response;
    if (isPlainObject(data)) {
      return;
    }

    if (typeof data === 'string') {
      response.data = parseJSON(data);
      return;
    }

    if (data instanceof Blob) {
      const text = await data.text();
      response.data = parseJSON(text);
    }
  } catch (error) {
    console.warn('Failed to transform Blob to JSON:', error);
  }
}

/**
 * 将 Axios 响应中的 ArrayBuffer 类型数据解析为JSON
 * @param response Axios 响应对象
 */
export async function transformArrayBufferToJson(response: AxiosResponse) {
  try {
    const { data } = response;

    if (isPlainObject(data)) {
      return;
    }

    if (typeof data === 'string') {
      response.data = parseJSON(data);
      return;
    }

    if (data instanceof ArrayBuffer) {
      const text = new TextDecoder('utf-8').decode(data);
      response.data = parseJSON(text);
    }
  } catch (error) {
    console.warn('Failed to transform ArrayBuffer to JSON:', error);
  }
}

/**
 * 安全解析 JSON 字符串
 * @param text JSON 字符串
 */
function parseJSON(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * 检查是否为普通对象
 * @param value 待检查的值
 */
function isPlainObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}
