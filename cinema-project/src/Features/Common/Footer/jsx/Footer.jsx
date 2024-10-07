import React from "react";
import { 
    Layout, 
    Row, 
    Col, 
    Typography, 
    Space, 
    Divider 
} from 'antd';
import { 
    FaFacebook, 
    FaTwitter, 
    FaApple, 
    FaGooglePlay, 
    FaInstagram, 
    FaYoutube 
} from 'react-icons/fa';

const { Footer } = Layout;
const { Text, Link } = Typography;

const CustomFooter = () => {
    return (
        <Footer style={{ backgroundColor: '#00051D', color: 'white', padding: '20px 50px' }}>
            <Row justify="space-between">
                {/* INTRODUCE Section */}
                <Col span={5}>
                    <Typography.Title level={4} style={{ color: 'white' }}>INTRODUCE</Typography.Title>
                    <Space direction="vertical" size="middle">
                        <Link href="#" style={{ color: 'white' }}>About Us</Link>
                        <Link href="#" style={{ color: 'white' }}>Operational Regulations</Link>
                        <Link href="#" style={{ color: 'white' }}>Usage Agreement</Link>
                        <Link href="#" style={{ color: 'white' }}>Privacy Policy</Link>
                    </Space>
                </Col>

                {/* CINEMA CORNER Section */}
                <Col span={5}>
                    <Typography.Title level={4} style={{ color: 'white' }}>CINEMA CORNER</Typography.Title>
                    <Space direction="vertical" size="middle">
                        <Link href="#" style={{ color: 'white' }}>Movie Genre</Link>
                        <Link href="#" style={{ color: 'white' }}>Movie Commentary</Link>
                        <Link href="#" style={{ color: 'white' }}>Movie Blog</Link>
                        <Link href="#" style={{ color: 'white' }}>Movie of the Month</Link>
                    </Space>
                </Col>

                {/* SUPPORT Section */}
                <Col span={5}>
                    <Typography.Title level={4} style={{ color: 'white' }}>SUPPORT</Typography.Title>
                    <Space direction="vertical" size="middle">
                        <Link href="#" style={{ color: 'white' }}>Recruit</Link>
                        <Link href="#" style={{ color: 'white' }}>Feedback</Link>
                        <Link href="#" style={{ color: 'white' }}>Sales & Services</Link>
                        <Link href="#" style={{ color: 'white' }}>Ticket Price</Link>
                    </Space>
                </Col>

                {/* CONTACT US Section */}
                <Col span={5}>
                    <Typography.Title level={4} style={{ color: 'white' }}>CONTACT US</Typography.Title>
                    <Space size="middle">
                        <FaFacebook size="24px" color="white" />
                        <FaTwitter size="24px" color="white" />
                        <FaInstagram size="24px" color="white" />
                        <FaYoutube size="24px" color="white" />
                    </Space>
                    <Divider />
                    <Typography.Title level={4} style={{ color: 'white' }}>DOWNLOAD APP</Typography.Title>
                    <Space size="middle">
                        <FaApple size="24px" color="white" />
                        <FaGooglePlay size="24px" color="white" />
                    </Space>
                </Col>
            </Row>
        </Footer>
    );
};

export default CustomFooter;
