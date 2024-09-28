import { useEffect, useState } from 'react'
import './ThemeSwitch.css'

export function ThemeSwitch() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTimeout(() => {
      const defaultTheme = localStorage.getItem('theme')
      if (defaultTheme) {
        handleChange(defaultTheme)
        return setTheme(defaultTheme)
      }
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      handleChange(systemTheme)
    }, 0)
  }, []);

  const handleChange = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    setTheme(theme)
    localStorage.setItem('theme', theme)
  };

  return (
    <>
      {theme === 'dark' ? (
        <button className='theme-btn' onClick={() => handleChange('light')} title='btn-light'>
          <i className='bi bi-sun'></i>
        </button>
      ) : (
        <button className='theme-btn' onClick={() => handleChange('dark')} title='btn-dark'>
          <i className='bi bi-moon'></i>
        </button>
      )}
    </>
  )
}
