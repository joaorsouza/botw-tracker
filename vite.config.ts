import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

export default defineConfig(({ mode }) => {
  // Trava contra vazamento de segredo. A regra do Vite ("só VITE_* vai pro
  // bundle") protege contra esquecer o prefixo, não contra colocá-lo onde não
  // devia: um VITE_DATABASE_URL funcionaria e publicaria a senha do banco no
  // .js que todo visitante baixa. Aqui isso vira build quebrado.
  const publicEnv = loadEnv(mode, process.cwd(), 'VITE_')
  const leaked = Object.keys(publicEnv).filter(k => /DATABASE|SECRET|PASSWORD|TOKEN|_KEY/i.test(k))
  if (leaked.length) {
    throw new Error(`Variável de servidor exposta ao bundle público: ${leaked.join(', ')}`)
  }

  return {
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
  }
})
