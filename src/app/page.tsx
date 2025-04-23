'use client';

import React, { useState } from 'react';
import {
    Card,
    Form,
    Input,
    Radio,
    Button,
    Divider,
    Typography,
    Space,
    message,
    Modal,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

export default function ExportFormPage() {
    const [submitting, setSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setSubmitting(true);
        // TODO: 调用导出接口
        console.log('提交数据：', values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        message.success('导出任务已提交，稍后请留意邮箱通知');
        setSubmitting(false);
        form.resetFields(['exchangeCode']);
    };

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
            <Title style={{ textAlign: 'center' }}>导出服务提交</Title>

            <Card variant="outlined">
            <Divider />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item label="文件链接" required>
                        <Space>
                            <Form.Item name="fileLink" noStyle rules={[
                                { required: true, message: '请填写分享文件的链接' },
                                { type: 'url', message: '请输入有效的 URL' },
                            ]}>
                                <Input placeholder="请填写您分享协作所复制的链接" style={{ width: 400 }} />
                            </Form.Item>
                            <Link href="#" onClick={() => setModalVisible(true)}>
                                查看示例
                            </Link>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            { required: true, message: '请输入接收导出结果的邮箱' },
                            { type: 'email', message: '请填写有效的邮箱地址' },
                        ]}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Space>
                                <Text>兑换码</Text>
                                <Link href="#" onClick={(e) => { e.preventDefault(); Modal.info({
                                    title: '在线客服',
                                    content: '请联系在线客服获取兑换码。',
                                })}}>
                                    （在线客服）
                                </Link>
                            </Space>
                        }
                        name="exchangeCode"
                        rules={[{ required: true, message: '请输入兑换码' }]}
                    >
                        <Input placeholder="请输入兑换码" />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Space>
                                <Text>文件格式</Text>
                                <InfoCircleOutlined style={{ color: '#1890ff' }} />
                                <Text type="secondary">请选择导出文件类型</Text>
                            </Space>
                        }
                        name="format"
                        rules={[{ required: true, message: '请选择文件格式' }]}
                    >
                        <Radio.Group>
                            <Space wrap>
                                {[
                                    '高清PNG', '高清JPG', 'SVG', '高清PDF',
                                    'POS文件', 'VISIO文件', 'XMind文件',
                                    'FreeMind(.mm)', 'Word(.docx)', 'Excel(.csv)', '导出全部画布(.posm)',
                                ].map((label) => (
                                    <Radio key={label} value={label}>
                                        {label}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={submitting}
                        >
                            开始导出
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Modal
                title="示例链接"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <img
                    src="/默认.png"
                    alt="示例"
                    style={{ width: '100%' }}
                />
            </Modal>
        </div>
    );
}
