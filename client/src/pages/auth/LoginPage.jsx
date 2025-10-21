import { Form, Input, Carousel, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../context/UserContext'; // Kullanıcı context'ini ekleyin

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useUser(); // Kullanıcı bilgilerini güncellemek için hook'u kullanın

    const onFinish = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json;charset=UTF-8" },
            });

            const data = await res.json();

            if (res.status === 200) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                message.success("Giriş işlemi başarılı");
                
                // Kullanıcıyı güncelleyin
                setUser({ email: values.email });

                if (values.email === "admin@gmail.com") {
                    navigate("/admin")
                } else {
                    navigate("/")
                }
            } else if (res.status === 404) {
                message.error("Kullanıcı bulunamadı!")
            } else if (res.status === 403) {
                message.error("Şifre yanlış!")
            } else if (res.status === 402) {
                message.error("Kullanıcı Giriş Yapmış Durumda!")
            }
            setLoading(false);
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#393E46' }} className='w-full' loading={loading}>
                            Giriş Yap
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <span>Bir Hesabın yok mu? Hemen <Link to="/register" className='text-blue-600'>kayıt ol!</Link></span>
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

export default LoginPage
