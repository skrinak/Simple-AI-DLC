import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import {
  RocketLaunch,
  Architecture,
  CloudSync,
  FormatQuote,
  Bolt,
  Storage,
  Layers,
  Cloud,
} from '@mui/icons-material';
import { nodeColors } from './theme';
import { useColorMode } from './ColorModeContext';

/* ------------------------------------------------------------------ */
/*  Shared node wrapper                                                */
/* ------------------------------------------------------------------ */

function NodeShell({
  children,
  accentColor,
  bgColor,
  borderColor,
  glowColor,
  width = 340,
  handles = { top: true, bottom: true },
}: {
  children: React.ReactNode;
  accentColor?: string;
  bgColor?: string;
  borderColor?: string;
  glowColor?: string;
  width?: number;
  handles?: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
}) {
  const { sc } = useColorMode();

  return (
    <Box sx={{ position: 'relative', width }}>
      {sc.showGlow && glowColor && (
        <Box
          className="node-glow"
          sx={{
            position: 'absolute',
            inset: -4,
            borderRadius: 3,
            background: glowColor,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}
      <Card
        sx={{
          background: bgColor || sc.cardBg,
          borderColor: borderColor || sc.cardBorder,
          borderTop: accentColor ? `3px solid ${accentColor}` : undefined,
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          {children}
        </CardContent>
      </Card>
      {handles.top && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: accentColor || '#475569', width: 8, height: 8, border: 'none' }}
        />
      )}
      {handles.bottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: accentColor || '#475569', width: 8, height: 8, border: 'none' }}
        />
      )}
      {handles.left && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          style={{ background: accentColor || '#475569', width: 8, height: 8, border: 'none' }}
        />
      )}
      {handles.right && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{ background: accentColor || '#475569', width: 8, height: 8, border: 'none' }}
        />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero node                                                          */
/* ------------------------------------------------------------------ */

export function HeroNode(_props: NodeProps) {
  const { sc } = useColorMode();
  const c = nodeColors.hero;
  return (
    <NodeShell
      width={420}
      glowColor={c.glow}
      handles={{ top: false, bottom: true }}
    >
      <Card
        elevation={0}
        sx={{
          background: c.gradient,
          borderRadius: 2,
          mb: 1.5,
          p: 0.5,
        }}
      >
        <Card
          elevation={0}
          sx={{
            background: sc.innerCardBg,
            borderRadius: 1.5,
            textAlign: 'center',
            py: 3,
            px: 2,
          }}
        >
          <Typography variant="h4" sx={{ color: sc.heading, mb: 0.5, fontSize: '1.75rem' }}>
            Simple-AI-DLC
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              background: c.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            AI-Driven Development Lifecycle
          </Typography>
        </Card>
      </Card>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Chip label="Enterprise" size="small" sx={{ bgcolor: 'rgba(59,130,246,0.15)', color: sc.accentBlue }} />
        <Chip label="Agent-First" size="small" sx={{ bgcolor: 'rgba(139,92,246,0.15)', color: sc.accentPurple }} />
        <Chip label="AWS-Native" size="small" sx={{ bgcolor: 'rgba(249,115,22,0.15)', color: sc.accentOrange }} />
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy node                                                    */
/* ------------------------------------------------------------------ */

export function PhilosophyNode(_props: NodeProps) {
  const { sc } = useColorMode();
  const c = nodeColors.philosophy;
  return (
    <NodeShell
      width={440}
      bgColor="rgba(6, 182, 212, 0.06)"
      borderColor="rgba(6, 182, 212, 0.2)"
      accentColor="#06B6D4"
      glowColor={c.glow}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <FormatQuote sx={{ color: '#06B6D4', fontSize: 32, mt: -0.5, transform: 'scaleX(-1)' }} />
        <Box>
          <Typography variant="h6" sx={{ color: sc.accentCyan, fontStyle: 'italic', lineHeight: 1.4, mb: 0.5 }}>
            AI drives, humans decide.
          </Typography>
          <Typography variant="body2" sx={{ color: sc.body, fontSize: '0.82rem' }}>
            The agent is the engine. You are the steering wheel.
          </Typography>
        </Box>
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Phase nodes                                                        */
/* ------------------------------------------------------------------ */

const phaseIcons: Record<string, React.ReactElement> = {
  Inception: <RocketLaunch />,
  Construction: <Architecture />,
  Operations: <CloudSync />,
};

interface PhaseData {
  phase: number;
  title: string;
  description: string;
  steps: string[];
  color: string;
}

export function PhaseNode({ data }: NodeProps & { data: PhaseData }) {
  const { sc } = useColorMode();
  const d = data as PhaseData;
  return (
    <NodeShell
      width={320}
      accentColor={d.color}
      bgColor={`${d.color}0A`}
      borderColor={`${d.color}40`}
      handles={{ top: true, bottom: true, left: true, right: true }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${d.color}20`,
            color: d.color,
          }}
        >
          {phaseIcons[d.title] || <Bolt />}
        </Box>
        <Box>
          <Chip
            label={`Phase ${d.phase}`}
            size="small"
            sx={{
              bgcolor: `${d.color}25`,
              color: d.color,
              fontWeight: 700,
              fontSize: '0.65rem',
              height: 20,
              mb: 0.3,
            }}
          />
          <Typography variant="h6" sx={{ color: sc.heading, fontSize: '1.05rem' }}>
            {d.title}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ color: sc.body, mb: 1.5, fontSize: '0.82rem', lineHeight: 1.5 }}>
        {d.description}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {d.steps.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            variant="outlined"
            sx={{
              borderColor: `${d.color}40`,
              color: `${d.color}`,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        ))}
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Tenets node                                                        */
/* ------------------------------------------------------------------ */

interface TenetsData {
  tenets: string[];
}

export function TenetsNode({ data }: NodeProps & { data: TenetsData }) {
  const { sc } = useColorMode();
  const d = data as TenetsData;
  const c = nodeColors.tenets;
  return (
    <NodeShell
      width={440}
      accentColor={c.accent}
      bgColor={c.bg}
      borderColor={c.border}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <Layers sx={{ color: c.accent, fontSize: 22 }} />
        <Typography variant="h6" sx={{ color: sc.heading, fontSize: '0.95rem' }}>
          Ten Foundational Tenets
        </Typography>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
        {d.tenets.map((t, i) => (
          <Stack key={i} direction="row" spacing={0.75} alignItems="center">
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: `${c.accent}20`,
                color: c.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </Box>
            <Typography variant="body2" sx={{ fontSize: '0.72rem', color: sc.muted, lineHeight: 1.3 }}>
              {t}
            </Typography>
          </Stack>
        ))}
      </Box>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Primitives node                                                    */
/* ------------------------------------------------------------------ */

interface PrimitivesData {
  dayOne: string[];
  opMaturity: string[];
}

export function PrimitivesNode({ data }: NodeProps & { data: PrimitivesData }) {
  const { sc } = useColorMode();
  const d = data as PrimitivesData;
  const c = nodeColors.primitives;
  return (
    <NodeShell
      width={380}
      accentColor={c.accent}
      bgColor={c.bg}
      borderColor={c.border}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <Bolt sx={{ color: c.accent, fontSize: 22 }} />
        <Typography variant="h6" sx={{ color: sc.heading, fontSize: '0.95rem' }}>
          Twelve Engineering Primitives
        </Typography>
      </Stack>

      <Typography
        variant="overline"
        sx={{ color: c.accent, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}
      >
        Day One Essentials
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5} mb={1.5}>
        {d.dayOne.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={{
              bgcolor: `${c.accent}18`,
              color: sc.accentPurple,
              fontSize: '0.65rem',
              height: 24,
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ borderColor: sc.divider, mb: 1.5 }} />

      <Typography
        variant="overline"
        sx={{ color: c.accent, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}
      >
        Operational Maturity
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
        {d.opMaturity.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            variant="outlined"
            sx={{
              borderColor: `${c.accent}35`,
              color: sc.accentPurpleLight,
              fontSize: '0.65rem',
              height: 24,
            }}
          />
        ))}
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Memory architecture node                                           */
/* ------------------------------------------------------------------ */

interface MemoryData {
  tiers: { tier: number; name: string; label: string; detail: string }[];
}

export function MemoryNode({ data }: NodeProps & { data: MemoryData }) {
  const { sc } = useColorMode();
  const d = data as MemoryData;
  const c = nodeColors.memory;
  return (
    <NodeShell
      width={340}
      accentColor={c.accent}
      bgColor={c.bg}
      borderColor={c.border}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <Storage sx={{ color: c.accent, fontSize: 22 }} />
        <Typography variant="h6" sx={{ color: sc.heading, fontSize: '0.95rem' }}>
          Memory Architecture
        </Typography>
      </Stack>
      <Stack spacing={1}>
        {d.tiers.map((tier) => (
          <Box
            key={tier.tier}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${c.accent}${12 - tier.tier * 3}A`,
              border: `1px solid ${c.accent}${40 - tier.tier * 8}`,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
              <Chip
                label={`Tier ${tier.tier}`}
                size="small"
                sx={{
                  bgcolor: `${c.accent}25`,
                  color: c.accent,
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  height: 20,
                }}
              />
              <Typography variant="subtitle2" sx={{ color: sc.accentAmber, fontSize: '0.8rem' }}>
                {tier.name}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ fontSize: '0.72rem', color: sc.body }}>
              <Box component="span" sx={{ color: sc.accentAmberMono, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                {tier.label}
              </Box>
              {' '}&mdash; {tier.detail}
            </Typography>
          </Box>
        ))}
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  AWS integration node                                               */
/* ------------------------------------------------------------------ */

interface AwsData {
  services: { name: string; role: string }[];
}

export function AwsNode({ data }: NodeProps & { data: AwsData }) {
  const { sc } = useColorMode();
  const d = data as AwsData;
  const c = nodeColors.aws;
  return (
    <NodeShell
      width={580}
      accentColor={c.accent}
      bgColor={c.bg}
      borderColor={c.border}
      handles={{ top: true, bottom: false }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <Cloud sx={{ color: c.accent, fontSize: 22 }} />
        <Typography variant="h6" sx={{ color: sc.heading, fontSize: '0.95rem' }}>
          AWS Integration
        </Typography>
        <Chip
          label="80% plumbing"
          size="small"
          sx={{ bgcolor: `${c.accent}20`, color: sc.accentOrange, fontWeight: 600, fontSize: '0.65rem', height: 22, ml: 'auto' }}
        />
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {d.services.map((svc) => (
          <Box
            key={svc.name}
            sx={{
              flex: '1 1 calc(50% - 8px)',
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${c.accent}0A`,
              border: `1px solid ${c.accent}25`,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: sc.accentOrange, fontSize: '0.82rem', mb: 0.25 }}>
              {svc.name}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.72rem', color: sc.body }}>
              {svc.role}
            </Typography>
          </Box>
        ))}
      </Stack>
    </NodeShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Node type registry                                                 */
/* ------------------------------------------------------------------ */

export const nodeTypes = {
  hero: HeroNode,
  philosophy: PhilosophyNode,
  phase: PhaseNode,
  tenets: TenetsNode,
  primitives: PrimitivesNode,
  memory: MemoryNode,
  aws: AwsNode,
};
