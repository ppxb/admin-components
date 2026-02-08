import type { App } from 'vue';
import type { Locale } from 'vue-i18n';
import type {
  ImportLocaleFn,
  LocaleSetupOptions,
  SupportedLanguagesType,
} from '@/types/i18n';
import { unref } from 'vue';
import { createI18n, useI18n } from 'vue-i18n';

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: '',
  messages: {},
});

/**
 * 从目录加载多语言文件
 *
 * @param regexp - 正则表达式
 * @param modules - 懒加载模块映射
 */
function loadLocalesMapFromDir(
  regexp: RegExp,
  modules: Record<string, () => Promise<unknown>>,
): Record<Locale, ImportLocaleFn> {
  const localesRaw: Record<Locale, Record<string, () => Promise<unknown>>> = {};

  for (const path in modules) {
    const match = path.match(regexp);
    if (match) {
      const [_, locale, fileName] = match;
      if (locale && fileName) {
        localesRaw[locale] ??= {};
        localesRaw[locale][fileName] = modules[path];
      }
    }
  }

  return Object.fromEntries(
    Object.entries(localesRaw).map(([locale, files]) => [
      locale,
      async () => {
        const messages: Record<string, any> = {};
        await Promise.all(
          Object.entries(files).map(async ([fileName, importFn]) => {
            messages[fileName] = ((await importFn()) as any)?.default;
          }),
        );
        return { default: messages };
      },
    ]),
  );
}

const modules = import.meta.glob('./langs/**/*.json');

/**
 * 加载翻译文件
 *
 * @param lang 语言
 */
async function loadAppMessages(lang: SupportedLanguagesType) {
  const localesMap = loadLocalesMapFromDir(
    /\.\/langs\/([^/]+)\/(.*)\.json$/,
    modules,
  );

  const appMessages = await localesMap[lang]?.();
  return appMessages?.default || {};
}

/**
 * 设置 i18n 语言
 *
 * @param locale 语言
 */
function setI18nLanguage(locale: Locale) {
  i18n.global.locale.value = locale;
  document?.querySelector('html')?.setAttribute('lang', locale);
}

/**
 * 加载并设置指定语言
 *
 * @param lang 语言
 */
async function loadLocaleMessages(lang: SupportedLanguagesType) {
  if (unref(i18n.global.locale) === lang) {
    return lang;
  }

  // 异步加载目标语言的翻译
  const appMessages = await loadAppMessages(lang);

  // 将加载后的翻译消息设置到 i18n 中
  i18n.global.setLocaleMessage(lang, appMessages);

  // 切换为目标语言并修改 DOM 属性
  setI18nLanguage(lang);
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  const { defaultLocale = 'en-US', missingWarn = !import.meta.env.PROD } =
    options;

  app.use(i18n);
  await loadLocaleMessages(defaultLocale);

  if (missingWarn) {
    i18n.global.setMissingHandler((locale, key) => {
      if (key.includes('.')) {
        console.warn(
          `[intlify] Not found '${key}' key in '${locale}' locale messages.`,
        );
      }
    });
  }
}

export { i18n, loadLocaleMessages, setupI18n, useI18n };
