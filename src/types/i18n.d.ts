declare namespace I18n {
  type SupportedLanguagesType = 'zh-CN' | 'en-US';

  type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>;

  type LoadMessageFn = (
    lang: SupportedLanguagesType,
  ) => Promise<Record<string, string> | undefined>;

  interface LocaleSetupOptions {
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
}
