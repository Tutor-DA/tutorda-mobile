import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Path, Line } from 'react-native-svg';
import {
  ArrowLeft,
  Pen,
  Eraser,
  RotateCcw,
  Save,
  Calculator,
  Grid3X3,
  Minus,
  Plus,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { theme } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface DrawingPath {
  id: string;
  path: string;
  color: string;
  strokeWidth: number;
}

export default function MathWorkspaceScreen() {
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [currentColor, setCurrentColor] = useState('#6366F1');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [showGrid, setShowGrid] = useState(true);
  const pathRef = useRef('');
  const canvasRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const path = `M${locationX},${locationY}`;
      pathRef.current = path;
      setCurrentPath(path);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const path = `${pathRef.current} L${locationX},${locationY}`;
      pathRef.current = path;
      setCurrentPath(path);
    },
    onPanResponderRelease: () => {
      if (pathRef.current) {
        setPaths(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            path: pathRef.current,
            color: tool === 'eraser' ? 'transparent' : currentColor,
            strokeWidth: tool === 'eraser' ? strokeWidth * 2 : strokeWidth,
          },
        ]);
        setCurrentPath('');
        pathRef.current = '';
      }
    },
  });

  const undo = () => setPaths(prev => prev.slice(0, -1));
  const clear = () => {
    setPaths([]);
    setCurrentPath('');
    pathRef.current = '';
  };

  const renderGrid = () => {
    if (!showGrid) return null;
    const lines = [];
    const gridSize = 20;
    for (let i = 0; i < width; i += gridSize) {
      lines.push(<Line key={`v${i}`} x1={i} y1={0} x2={i} y2={height - 200} stroke="#E5E7EB" strokeWidth={0.5} />);
    }
    for (let i = 0; i < height - 200; i += gridSize) {
      lines.push(<Line key={`h${i}`} x1={0} y1={i} x2={width} y2={i} stroke="#E5E7EB" strokeWidth={0.5} />);
    }
    return lines;
  };

  const saveToImage = async () => {
    try {
      const uri = await captureRef(canvasRef, {
        format: 'png',
        quality: 1,
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow access to save images');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Drawing saved to your gallery!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Math Workspace</Text>
        <TouchableOpacity onPress={saveToImage}>
          <Save size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} {...panResponder.panHandlers} ref={canvasRef}>
        <Svg height={height - 200} width={width}>
          {renderGrid()}
          {paths.map(p => (
            <Path key={p.id} d={p.path} stroke={p.color} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {currentPath ? (
            <Path d={currentPath} stroke={tool === 'eraser' ? 'transparent' : currentColor} strokeWidth={tool === 'eraser' ? strokeWidth * 2 : strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}
        </Svg>
      </View>

      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.toolbar}>
        <View style={styles.section}>
          <TouchableOpacity style={[styles.button, tool === 'pen' && styles.activeButton]} onPress={() => setTool('pen')}>
            <Pen size={20} color={tool === 'pen' ? theme.colors.primary : theme.colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, tool === 'eraser' && styles.activeButton]} onPress={() => setTool('eraser')}>
            <Eraser size={20} color={tool === 'eraser' ? theme.colors.primary : theme.colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowGrid(!showGrid)}>
            <Grid3X3 size={20} color={showGrid ? theme.colors.primary : theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => setStrokeWidth(Math.max(1, strokeWidth - 1))}>
            <Minus size={16} color={theme.colors.text.secondary} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: strokeWidth * 2, height: strokeWidth * 2, backgroundColor: currentColor, borderRadius: strokeWidth }} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setStrokeWidth(Math.min(10, strokeWidth + 1))}>
            <Plus size={16} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={undo}>
            <RotateCcw size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: theme.colors.text.secondary }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: `${theme.colors.primary}15` }]}>
            <Calculator size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: `${theme.colors.primary}15`,
  },
});
