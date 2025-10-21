import { Modal, Form, Input, Button } from "antd";
import { message } from "antd";
import { useState } from "react";

const CreateBill = ({ isModalOpen, setIsModalOpen, refreshParquets, reqUrl }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/${reqUrl}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json;charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Başarıyla Güncellendi");
                setIsModalOpen(false);
                refreshParquets();
            } else {
                message.error("Güncelleme başarısız!");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Ürün Ekle" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
            <Form layout={"vertical"} onFinish={onFinish}>
                <Form.Item label="Ürün İD" name="id" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Ürün İD Giriniz" />
                </Form.Item>
                <Form.Item label="Ürün İsmi" name="name">
                    <Input placeholder="Ürün İsmi Giriniz" />
                </Form.Item>
                <Form.Item label="Ürün Fiyatı" name="price">
                    <Input placeholder="Fiyat Giriniz" />
                </Form.Item>
                <Form.Item label="Ürün Resmi" name="img">
                    <Input placeholder="Ürün Resmi Giriniz" />
                </Form.Item>
                <Button type="primary" className="w-full" style={{ backgroundColor: '#333' }} loading={loading} 
                htmlType="submit" >Güncelle</Button>
            </Form>
        </Modal>
    );
};

export default CreateBill;
