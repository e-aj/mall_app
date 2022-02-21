import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const fs = require("fs")
const dotenv = require("dotenv")
const { resolve } = require('path') // 编辑器提示 path 模块找不到，可以yarn add @types/node --dev
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default ({ command, mode }) =>{
	let NODE_ENV =  process.env.NODE_ENV || 'development';
	let envFiles = [];
	//根据不同的环境使用不同的环境变量
	if(command == 'serve'){
		envFiles = [
			/** default file */
			`.env`
		]
	}else{
		envFiles = [
			/** default file */
			`.env`,
			/** mode file */
			`.env.${NODE_ENV}`
		]
	}
	for (const file of envFiles) {
		const envConfig = dotenv.parse(fs.readFileSync(file))
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
	}
	return defineConfig({
		plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
		resolve: {
		    alias: {
		      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
		    }
		},
		server: {
			host: process.env.VITE_HOST,
			port: process.env.VITE_PORT,
			// 是否自动在浏览器打开
			open: true,
			// 是否开启 https
			https: false,
			// 服务端渲染
			ssr: false,
			base: process.env.VITE_BASE_URL,
			outDir: process.env.VITE_OUTPUT_DIR,
			proxy: {
			  '/api': {
				// target: 'http://api网关所在域名',
				target:'http://backend-api-01.newbee.ltd/api',
				changeOrigin: true,
				pathRewrite: {
                    '^/api': ''
                }
			  },
			}
		},
	})
}

