import { Modal, Form, Input, Card } from "antd";

const CreateBill = ({ isModalOpen, setIsModalOpen, total, kdv, total2 }) => {
    return (
        <Modal title="Fatura Oluştur" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
            <Form layout={"vertical"}>
                <Form.Item label="Alıcı İsmi" name="cartUserName" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Alıcı İsmi Giriniz" />
                </Form.Item>
                <Form.Item label="Adres" name="address" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Adres Giriniz" />
                </Form.Item>
                <Form.Item label="Telefon Numarası" name="phoneNumber" rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}>
                    <Input placeholder="Telefon Numarası Giriniz" maxLength={11} />
                </Form.Item>
                <Card className="">
                    <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>{total}₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV</span>
                        <span className="text-red-600">+{kdv}₺</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Toplam</span>
                        <span>{total2}₺</span>
                    </div>
                    <button class="Btn flex justify-end mt-4" onClick={() => setIsModalOpen(true)}>
                        Sipariş Oluştur
                        <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                    </button>
                </Card>
            </Form>
        </Modal>
    )
}

export default CreateBill