import { request } from '@/lib/request';

const endpoint = '/captcha';

export function fetchImgCaptcha() {
  return request<Api.Captcha.ImgCaptcha>({ url: `${endpoint}/image` });
}
