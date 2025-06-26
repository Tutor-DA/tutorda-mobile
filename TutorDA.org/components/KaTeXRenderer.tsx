import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

interface KaTeXRendererProps {
  latex: string;
  style?: any;
  displayMode?: boolean;
  errorColor?: string;
  fontSize?: number;
  height?: number;
}

export function KaTeXRenderer({
  latex,
  style,
  displayMode = true,
  errorColor = '#f44336',
  fontSize = 16,
  height = 100,
}: KaTeXRendererProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [webViewHeight, setWebViewHeight] = useState(height);

  const cleanLatex = latex
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 8px;
            font-size: ${fontSize}px;
            display: flex;
            justify-content: ${displayMode ? 'center' : 'flex-start'};
            align-items: center;
            min-height: ${height}px;
            background-color: transparent;
          }
          .katex-error {
            color: ${errorColor};
          }
          .katex-display {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div id="formula"></div>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            try {
              katex.render("${cleanLatex}", document.getElementById('formula'), {
                displayMode: ${displayMode},
                throwOnError: false,
                errorColor: "${errorColor}",
                output: "html"
              });
              const height = document.body.scrollHeight;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'height', height }));
            } catch (e) {
              document.getElementById('formula').innerHTML =
                '<span class="katex-error">Error rendering formula: ' + e.message + '</span>';
            }
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'height') {
        setWebViewHeight(data.height);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#6366F1" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={[styles.webView, { height: webViewHeight }]}
        scrollEnabled={false}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState
        renderLoading={() => <View />} // ✅ Return minimal valid React element
        onError={(e) => console.error('WebView error:', e.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    marginVertical: 4,
  },
  webView: {
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
