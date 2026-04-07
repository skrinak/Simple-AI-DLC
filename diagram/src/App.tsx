import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  BackgroundVariant,
  type ColorMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toPng } from 'html-to-image';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { DarkMode, LightMode, Download } from '@mui/icons-material';

import { nodeTypes } from './nodes';
import { initialNodes, initialEdges } from './flowData';
import { useColorMode } from './ColorModeContext';

const defaultViewport = { x: 80, y: 20, zoom: 0.72 };

const minimapNodeColor = (node: { type?: string }) => {
  switch (node.type) {
    case 'hero':        return '#6366F1';
    case 'philosophy':  return '#06B6D4';
    case 'phase':       return '#8B5CF6';
    case 'tenets':      return '#10B981';
    case 'primitives':  return '#8B5CF6';
    case 'memory':      return '#F59E0B';
    case 'aws':         return '#F97316';
    default:            return '#475569';
  }
};

const PADDING = 80;
const PIXEL_RATIO = 3;

export default function App() {
  const { mode, toggleMode, sc } = useColorMode();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getNodes } = useReactFlow();

  const colorMode: ColorMode = mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const handleDownload = useCallback(() => {
    const flowNodes = getNodes();
    if (flowNodes.length === 0) return;

    const bounds = getNodesBounds(flowNodes);
    const width = bounds.width + PADDING * 2;
    const height = bounds.height + PADDING * 2;
    const viewport = getViewportForBounds(bounds, width, height, 0.5, 2, PADDING);

    const el = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!el) return;

    toPng(el, {
      backgroundColor: mode === 'dark' ? '#0B1120' : '#F8FAFC',
      width,
      height,
      pixelRatio: PIXEL_RATIO,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `skrinak-dlc-${mode}.png`;
      a.click();
    });
  }, [getNodes, mode]);

  const themedEdges = useMemo(
    () =>
      edges.map((e) => ({
        ...e,
        labelStyle: e.labelStyle
          ? { ...e.labelStyle, fill: sc.edgeLabelFill }
          : e.labelStyle,
        labelBgStyle: e.labelBgStyle
          ? { ...e.labelBgStyle, fill: sc.edgeLabelBg }
          : e.labelBgStyle,
      })),
    [edges, sc],
  );

  const proOptions = { hideAttribution: true };

  const onInit = useCallback(() => {}, []);

  const isDark = mode === 'dark';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
      >
        <Tooltip title="Download PNG" placement="bottom">
          <IconButton
            onClick={handleDownload}
            sx={{
              width: 44,
              height: 44,
              bgcolor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              backdropFilter: 'blur(12px)',
              color: isDark ? '#94A3B8' : '#64748B',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                color: isDark ? '#F8FAFC' : '#0F172A',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} placement="bottom">
          <IconButton
            onClick={toggleMode}
            sx={{
              width: 44,
              height: 44,
              bgcolor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              backdropFilter: 'blur(12px)',
              color: isDark ? '#F59E0B' : '#6366F1',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)',
              },
            }}
          >
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </Stack>

      <ReactFlow
        nodes={nodes}
        edges={themedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        colorMode={colorMode}
        proOptions={proOptions}
        fitView={false}
        minZoom={0.3}
        maxZoom={1.8}
        snapToGrid
        snapGrid={[20, 20]}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color={isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.12)'}
        />
        <Controls position="bottom-left" showInteractive={false} />
        <MiniMap
          position="bottom-right"
          nodeColor={minimapNodeColor}
          maskColor={isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'}
          style={{ width: 180, height: 120 }}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
