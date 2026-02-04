declare namespace Api {
  interface Res<T = unknown> {
    code: string;
    data: T;
    msg: string;
    success: boolean;
    timestamp: string;
  }

  namespace Captcha {
    interface ImgCaptcha {
      uuid: string;
      img: string;
      isEnabled: boolean;
      expireTime: number;
    }
  }
}
