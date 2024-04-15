import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    //局域网多设备调试需要
    // server: {
    //     host: '192.168.1.132', // 设置主机，默认是 localhost
    //     port: 5173, // 设置端口，默认是 3000
    // },

    //线上
    server: {
        host: '47.97.179.125', // 设置主机，默认是 localhost
        port: 8889, // 设置端口，默认是 3000
    }
};
