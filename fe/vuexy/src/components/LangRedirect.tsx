'use client'

// Next Imports
import { useLocation, useParams } from "react-router-dom";

// Config Imports
import { i18n } from '@configs/i18n'

const LangRedirect = () => {
  const pathname = usePathname()

  const redirectUrl = `/${i18n.defaultLocale}${pathname}`

  redirect(redirectUrl)
}

export default LangRedirect
