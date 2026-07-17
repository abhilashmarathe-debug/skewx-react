// After `vite build`, copy .htaccess into dist/ so it gets uploaded to hPanel.
// hPanel's Apache uses this to route ALL paths to index.html (React Router needs this).
import { copyFileSync, existsSync } from 'fs'

if (existsSync('.htaccess')) {
  copyFileSync('.htaccess', 'dist/.htaccess')
  console.log('✓ .htaccess copied to dist/')
} else {
  console.log('⚠ .htaccess not found, skipping')
}
