import { useEffect } from 'react';
import { useAppStore } from '../../store/appStore.js';

export function ThemeProvider({ children }) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return children;
}
