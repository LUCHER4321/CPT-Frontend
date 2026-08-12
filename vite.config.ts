import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const {
    VITE_PORT: PORT,
    VITE_GOOGLE_ADSENSE_TXT: GOOGLE_TXT
  } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'generate-ads-txt',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/ads.txt') {
              res.setHeader('Content-Type', 'text/plain');
              res.end(GOOGLE_TXT);
              return;
            }
            next();
          });
        },
        generateBundle(){
          if(GOOGLE_TXT){
            this.emitFile({
              type: 'asset',
              fileName: 'ads.txt',
              source: GOOGLE_TXT
            });
          }
        }
      }
    ],
    server: {
      port: Number(PORT) ?? 5173
    },
    build: {
      target: "es2019"
    }
  }
})
