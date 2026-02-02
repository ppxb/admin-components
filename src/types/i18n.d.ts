export type SupportedLanguagesType = 'zh-CN' | 'en-US';

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>;

export type LoadMessageFn = (
  lang: SupportedLanguagesType,
) => Promise<Record<string, string> | undefined>;

export interface LocaleSetupOptions {
  /**
   * 默认语言
   */
  defaultLocale?: SupportedLanguagesType;

  /**
   * 加载语言处理器
   */
  loadMessages?: LoadMessageFn;

  /**
   * 是否在找不到对应语言时发出警告
   */
  missingWarn?: boolean;
}
