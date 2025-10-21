import { Button, Form, Input, Carousel, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json;charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Kayıt işlemi başarılı");
                navigate("/login");
                setLoading(false);
            } else if (res.status === 400) {
                message.error("E-mail adresi ile kayıtlı hesap zaten var!");
                setLoading(false);
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className="register-page">
            <div className="register-left-side">
                <div className="logo-container2">
                    <a href="/">
                        <img src="images/logo2.png" alt="" className='logo-image2' />
                    </a>
                </div>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Kullanıcı Adı" name={"username"} rules={[{ required: true, message: "Bu alan boş bırakılamaz!", }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name={"email"} rules={[
                        {
                            type: 'email',
                            message: 'Lütfen geçerli bir email girin!',
                        },
                        {
                            required: true,
                            message: "Bu alan boş bırakılamaz!",
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Şifre" name={"password"} rules={[{ required: true, message: "Bu alan boş bırakılamaz!", }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Şifre Tekrar" name={"passwordAgain"} dependencies={['password']}
                        rules={[{
                            required: true,
                            message: "Bu alan boş bırakılamaz!",
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#393E46' }} loading={loading} className='w-full'>
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <span>Bir Hesabın mı var? Şimdi <Link to="/login" className='text-blue-600'>giriş yap!</Link></span>
                </div>
            </div>
            <div className="register-right-side">
                <Carousel autoplay >
                    <div className='carousel-image-container'>
                        <img src="images/carousel1.jpg" alt="" />
                        <span>Eviniz için ferah ve şık tasarımlar!</span>
                    </div>
                    <div className='carousel-image-container'>
                        <img src="images/carousel2.webp" alt="" />
                        <span>Güvenilir ve iyi malzeme kalitesi!</span>
                    </div>
                    <div className='carousel-image-container'>
                        <img src="images/carousel3.avif" alt="" />
                        <span>Hızlı ve güvenilir teslimat!</span>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default RegisterPage