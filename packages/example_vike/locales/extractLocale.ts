import { localeDefault } from './locales'

export function extractLocale(urlPathname: string) {
    const [ _, locale, urlPathnameWithoutLocale = '' ] = urlPathname.split('/', 3)
    return {
        locale: locale || localeDefault,
        urlPathnameWithoutLocale: `/${urlPathnameWithoutLocale}`
    }
}
