import Header from "../../components/header/Header"
import { Avatar, Button, message, Input, Form, Row, Col } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const MyAccount = () => {

    //Çıkış yapma fonksiyonu
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.status === 200) {
                localStorage.removeItem('token');
                message.success("Çıkış Yapıldı");
                navigate("/login");
            } else {
                message.error("Çıkış yapılamadı, tekrar deneyin");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //Kullanıcı bilgileri getirme fonskiyonu
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch("http://localhost:5000/api/users/get-user", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [])

    //Kullanıcı bilgileri güncelleme fonksiyonu
    const [loading2, setLoading2] = useState(false);

    const onFinish2 = async (values) => {
        setLoading2(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;
                const updatedValues = { ...values, _id: userId };

                const res = await fetch("http://localhost:5000/api/users/update-user", {
                    method: "PUT",
                    body: JSON.stringify(updatedValues),
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                });

                if (res.status === 200) {
                    message.success("Başarıyla Güncellendi");
                } else if (res.status === 400) {
                    message.error("E-mail adresi ile kayıtlı hesap zaten var!");
                } else {
                    message.error("Güncelleme sırasında bir hata oluştu!");
                }
            } else {
                message.error("Token bulunamadı!");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        } finally {
            setLoading2(false);
        }
    }

    //Hesabı silme fonksiyonu
    const [loading3, setLoading3] = useState(false);

    const onFinish3 = async () => {
        setLoading3(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;

                const res = await fetch(`http://localhost:5000/api/auth/delete-account/${userId}`, {
                    method: "DELETE",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                });

                if (res.status === 200) {
                    message.success("Hesap Başarıyla Silindi");
                    navigate("/register")
                } else {
                    message.error("Hesap silme sırasında bir hata oluştu!");
                }
            } else {
                message.error("Token bulunamadı!");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        } finally {
            setLoading3(false);
        }
    }

    return (
        <div>
            <Header />
            <div className="user-profile-main">
                <div className="user-profile-icon">
                    <Avatar size={55} icon={<UserOutlined />} />
                </div>
                <div className="user-profile-text-section">
                    <Form layout='vertical' onFinish={onFinish2}>
                        <Form.Item label="Kullanıcı Adı" name={"username"}>
                            <Input placeholder={user.username} />
                        </Form.Item>
                        <Form.Item label="Email" name={"email"} rules={[
                            {
                                type: 'email',
                                message: 'Lütfen geçerli bir email girin!',
                            },
                        ]}>
                            <Input placeholder={user.email} />
                        </Form.Item>
                        <Form.Item label="Şifre" name={"password"}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Şifre Tekrar" name={"passwordAgain"} dependencies={['password']}
                            rules={[{
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Şifreler aynı olmalı!'));
                                },
                            }),
                            ]}>
                            <Input.Password />
                        </Form.Item>
                        <Row gutter={30}>
                            <Col>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ backgroundColor: '#393E46' }}
                                        loading={loading2}
                                    >
                                        Güncelle
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: '#393E46' }}
                                        loading={loading}
                                        onClick={onFinish}
                                    >
                                        Çıkış Yap
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: '#393E46' }}
                                        loading={loading3}
                                        onClick={onFinish3}
                                    >
                                        Hesabı Sil
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default MyAccount