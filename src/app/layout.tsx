// app/layout.tsx
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
export const metadata = {
    title: '导出服务提交',
    description: '导出服务提交表单页面示例',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="zh-CN">
        <body>
        <AntdRegistry>
            {children}
        </AntdRegistry>
        </body>
        </html>
    );
}

