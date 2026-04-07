import { createTheme, type Theme } from '@mui/material/styles';

/* ------------------------------------------------------------------ */
/*  Semantic colors — single source of truth for mode-aware nodes      */
/* ------------------------------------------------------------------ */

export interface SemanticColors {
  heading: string;
  body: string;
  muted: string;
  cardBg: string;
  cardBorder: string;
  innerCardBg: string;
  hoverShadow: string;
  hoverBorder: string;
  accentBlue: string;
  accentPurple: string;
  accentPurpleLight: string;
  accentOrange: string;
  accentAmber: string;
  accentAmberMono: string;
  accentCyan: string;
  edgeLabelFill: string;
  edgeLabelBg: string;
  showGlow: boolean;
  divider: string;
}

export const semanticDark: SemanticColors = {
  heading: '#F1F5F9',
  body: '#94A3B8',
  muted: '#CBD5E1',
  cardBg: 'rgba(15, 23, 42, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.06)',
  innerCardBg: 'rgba(15, 23, 42, 0.92)',
  hoverShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  hoverBorder: 'rgba(255, 255, 255, 0.12)',
  accentBlue: '#93C5FD',
  accentPurple: '#C4B5FD',
  accentPurpleLight: '#A78BFA',
  accentOrange: '#FDBA74',
  accentAmber: '#FDE68A',
  accentAmberMono: '#FCD34D',
  accentCyan: '#E0F2FE',
  edgeLabelFill: '#94A3B8',
  edgeLabelBg: '#0F172A',
  showGlow: true,
  divider: 'rgba(139, 92, 246, 0.15)',
};

export const semanticLight: SemanticColors = {
  heading: '#0F172A',
  body: '#64748B',
  muted: '#475569',
  cardBg: 'rgba(255, 255, 255, 0.92)',
  cardBorder: 'rgba(0, 0, 0, 0.10)',
  innerCardBg: 'rgba(255, 255, 255, 0.98)',
  hoverShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  hoverBorder: 'rgba(0, 0, 0, 0.18)',
  accentBlue: '#2563EB',
  accentPurple: '#7C3AED',
  accentPurpleLight: '#6D28D9',
  accentOrange: '#EA580C',
  accentAmber: '#92400E',
  accentAmberMono: '#B45309',
  accentCyan: '#0C4A6E',
  edgeLabelFill: '#64748B',
  edgeLabelBg: '#F8FAFC',
  showGlow: false,
  divider: 'rgba(139, 92, 246, 0.12)',
};

/* ------------------------------------------------------------------ */
/*  MUI themes                                                         */
/* ------------------------------------------------------------------ */

const shared = {
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' } as const,
    h5: { fontWeight: 700, letterSpacing: '-0.01em' } as const,
    h6: { fontWeight: 600 } as const,
    subtitle1: { fontWeight: 500, fontSize: '0.95rem' } as const,
  },
  shape: { borderRadius: 16 },
  components: {
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: '0.75rem', height: 28 },
      },
    },
  },
};

export const darkTheme: Theme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    background: { default: '#0B1120', paper: 'rgba(15, 23, 42, 0.8)' },
    primary: { main: '#3B82F6' },
    secondary: { main: '#8B5CF6' },
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    info: { main: '#06B6D4' },
  },
  components: {
    ...shared.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      },
    },
  },
});

export const lightTheme: Theme = createTheme({
  ...shared,
  palette: {
    mode: 'light',
    background: { default: '#F8FAFC', paper: 'rgba(255, 255, 255, 0.9)' },
    primary: { main: '#2563EB' },
    secondary: { main: '#7C3AED' },
    success: { main: '#059669' },
    warning: { main: '#D97706' },
    error: { main: '#DC2626' },
    info: { main: '#0891B2' },
  },
  components: {
    ...shared.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
            borderColor: 'rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Node accent colors (mode-independent)                              */
/* ------------------------------------------------------------------ */

export const nodeColors = {
  hero: { gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', glow: 'rgba(99, 102, 241, 0.3)' },
  philosophy: { gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)', glow: 'rgba(6, 182, 212, 0.3)' },
  inception: { accent: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.3)' },
  construction: { accent: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.3)' },
  operations: { accent: '#10B981', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.3)' },
  tenets: { accent: '#10B981', bg: 'rgba(16, 185, 129, 0.06)', border: 'rgba(16, 185, 129, 0.25)' },
  primitives: { accent: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.06)', border: 'rgba(139, 92, 246, 0.25)' },
  memory: { accent: '#F59E0B', bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.25)' },
  aws: { accent: '#F97316', bg: 'rgba(249, 115, 22, 0.06)', border: 'rgba(249, 115, 22, 0.25)' },
};
