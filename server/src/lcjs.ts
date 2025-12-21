import { lightningChart } from '@lightningchart/lcjs-headless'

let initialized = false

export const initLCJSHeadlessLicense = () => {
  if (initialized) return

  lightningChart({
    license: process.env.LCJS_LICENSE,
    licenseInformation: {
      appTitle: "LightningChart JS Trial",
      company: "LightningChart Ltd."
    },
  })

  initialized = true
}
