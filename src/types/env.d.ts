/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_PROXY_URL: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
  readonly VITE_STORAGE_PREFIX: string;
  readonly VITE_BACKEND_SUCCESS_CODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
