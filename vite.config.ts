import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  require('dotenv').config({ path: `./.env.${mode}` });
  console.log(mode)
  // now you can access config with process.env.{configName}

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env
    }
  })
}
