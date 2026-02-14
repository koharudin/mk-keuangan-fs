

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import Cookies from 'js-cookie';

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieName = themeConfig.settingsCookieName;
  const cookieValue = Cookies.get(cookieName); // string | undefined

  if (!cookieValue) return themeConfig; // fallback default settings
  try {
    return JSON.parse(cookieValue);
  } catch (e) {
    console.error('Failed to parse settings cookie:', e);
    return themeConfig;
  }
}

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode

  return _mode
}

export const getSystemMode = async (): Promise<SystemMode> => {
  const mode = await getMode()

  const colorPrefCookie = ('light') as SystemMode

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}

export const getServerMode = async () => {
  const mode = await getMode()
  const systemMode = await getSystemMode()

  return mode === 'system' ? systemMode : mode
}

export const getSkin = async () => {
  const settingsCookie = await getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}
