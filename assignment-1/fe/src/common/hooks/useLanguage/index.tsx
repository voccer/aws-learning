import { useGlobalState } from '../useGlobalState'
export const LANG_KEY = 'lang'

export function useLanguage(
  initLang: Types.LanguageType = 'jp'
): [Types.LanguageType, React.Dispatch<React.SetStateAction<Types.LanguageType>>] {
  const [lang = initLang, setLang] = useGlobalState<Types.LanguageType>(LANG_KEY)
  return [lang, setLang]
}
