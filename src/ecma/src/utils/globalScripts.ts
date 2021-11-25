export const googleAnalyticsScript = `
  ;(function() {
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date())
    gtag('config', 'UA-100232391-4')
  })()
`

export const themePreferenceScript = `
  ;(function() {
    var preferredTheme = getTheme()
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))

    darkQuery.addListener(function(e) {
      saveThemePreference(e.matches ? 'dark' : 'light')
    })

    function setTheme(newTheme) {
      document.body.className = newTheme
    }

    function getTheme() {
      try {
        var preferredTheme = localStorage.getItem('theme')
        return preferredTheme
      } catch (err) {}
    }

    function saveThemePreference(newTheme) {
      setTheme(newTheme)
      try {
        localStorage.setItem('theme', newTheme)
      } catch (err) {}
    }
  })()
`
