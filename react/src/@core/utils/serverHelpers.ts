
// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'

export const getSettingsFromCookie = () => {
  const cookieStore = null;

  const cookieName = themeConfig.settingsCookieName

  return JSON.parse('{}')
}

export const getMode = () => {
  // Get mode from cookie or fallback to theme config
  const _mode = themeConfig.mode

  return _mode
}

export const getSystemMode = () => {
  return 'light'
}

export const getServerMode = () => {

  return 'system'
}

export const getSkin =  () => {

  return 'default'
}
