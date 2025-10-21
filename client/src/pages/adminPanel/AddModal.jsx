import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";

const AddModal = ({ isModalOpen, setIsModalOpen, refreshParquets, reqUrl }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/${reqUrl}`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json;charset=UTF-8" },
            });

            if (res.status === 200) {
                message.success(`Başarıyla Eklendi`);
                setIsModalOpen(false);
                refreshParquets();
            } else {
                message.error(`Eklenirken Bir Sorun Çıktı!`);
            }
        } catch (error) {
            message.error("Bir Şeyler Yanlış Gitti!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Ürün Ekle" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
            <Form layout={"vertical"} onFinish={onFinish}>
                <Form.Item label="Ürün İsmi" name="name" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Ürün İsmi Giriniz" />
                </Form.Item>
                <Form.Item label="Ürün Fiyatı" name="price" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Fiyat Giriniz" />
                </Form.Item>
                <Form.Item label="Ürün Resmi" name="img" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Ürün Resmi Giriniz" />
                </Form.Item>
                <Button type="primary" className="w-full" style={{ backgroundColor: '#333' }} htmlType="submit" loading={loading} >Ekle</Button>
            </Form>
        </Modal>
    );
};

export default AddModal