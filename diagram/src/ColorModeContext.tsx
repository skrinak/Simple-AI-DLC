import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  darkTheme,
  lightTheme,
  semanticDark,
  semanticLight,
  type SemanticColors,
} from './theme';

type Mode = 'dark' | 'light';

interface ColorModeContextValue {
  mode: Mode;
  toggleMode: () => void;
  sc: SemanticColors;
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'dark',
  toggleMode: () => {},
  sc: semanticDark,
});

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark');

  const value = useMemo<ColorModeContextValue>(() => ({
    mode,
    toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    sc: mode === 'dark' ? semanticDark : semanticLight,
  }), [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
