import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, message } from 'antd';
import Header from '../../components/header/Header';
import CreateBill from './CreateBill';

const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [userId, setUserId] = useState(null);
    const [total, setTotal] = useState(0);

    //Sepeti getirme
    useEffect(() => {
        // LocalStorage'dan token'ı al
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.user_id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/cart/${userId}`)
                .then(response => {
                    const cartData = response.data.items.map((item, index) => ({
                        key: index + 1,
                        productImg: item.productImg,
                        productName: item.productName,
                        productPrice: item.productPrice,
                        quantity: item.quantity,
                        productId: item.productId,
                    }));
                    setDataSource(cartData);
                    const totalAmount = cartData.reduce((acc, item) => acc + item.quantity * item.productPrice, 0);
                    setTotal(totalAmount);
                })
                .catch(error => {
                    console.error('Sepet verisi çekilemedi:', error);
                });
        }
    }, [userId]);

    //Ürün adedi güncelleme
    const updateCartItemQuantity = (productId, newQuantity) => {
        axios.put(`http://localhost:5000/api/cart/${userId}/${productId}`, { quantity: newQuantity })
            .then(() => {
                axios.get(`http://localhost:5000/api/cart/${userId}`)
                    .then(response => {
                        const cartData = response.data.items.map((item, index) => ({
                            key: index + 1,
                            productId: item.productId,
                            productImg: item.productImg,
                            productName: item.productName,
                            productPrice: item.productPrice,
                            quantity: item.quantity,
                        }));
                        setDataSource(cartData);
                        const totalAmount = cartData.reduce((acc, item) => acc + item.quantity * item.productPrice, 0);
                        setTotal(totalAmount);
                    })
                    .catch(error => {
                        console.error('Sepet verisi çekilemedi:', error);
                    });
            })
            .catch(error => {
                console.error('Adet güncellenemedi:', error);
                message.error("Adet Güncellenemedi!");
            });
    };

    const increaseQuantity = (productId, currentQuantity) => {
        updateCartItemQuantity(productId, currentQuantity + 1);
    };

    const decreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCartItemQuantity(productId, currentQuantity - 1);
        } else {
            removeFromCart(productId);
        }
    };

    //Tablo  kolonları
    const columns = [
        {
            dataIndex: 'productImg',
            key: 'productImg',
            render: (text) => <img src={text} alt="product" style={{ width: '70px', height: '70px' }} />,
        },
        {
            title: 'Ürün İsmi',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Fiyat',
            dataIndex: 'productPrice',
            key: 'productPrice',
            render: (text) => `${text}₺`,
        },
        {
            title: 'Adet',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => decreaseQuantity(record.productId, record.quantity)}> - </button>
                    <span style={{ margin: '0 10px' }}>{record.quantity}</span>
                    <button onClick={() => increaseQuantity(record.productId, record.quantity)}> + </button>
                </div>
            ),
        },
        {
            title: 'Toplam',
            key: 'total',
            render: (text, record) => `${record.quantity * record.productPrice}₺`,
        },
        {
            dataIndex: 'operation',
            render: (_, record) => (
                <button className="bin-button" onClick={() => removeFromCart(record.productId)}>
                    <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
                        <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3"></line>
                    </svg>
                    <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_8_19" fill="white">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                        </mask>
                        <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)"></path>
                        <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                        <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                    </svg>
                </button>
            ),
        },
    ];

    //Sepetten ürün silme
    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`)
            .then(() => {
                axios.get(`http://localhost:5000/api/cart/${userId}`)
                    .then(response => {
                        message.success('Ürün sepetten silindi');
                        const cartData = response.data.items.map((item, index) => ({
                            key: index + 1,
                            productId: item.productId,
                            productImg: item.productImg,
                            productName: item.productName,
                            productPrice: item.productPrice,
                            quantity: item.quantity,
                        }));
                        setDataSource(cartData);
                        const totalAmount = cartData.reduce((acc, item) => acc + item.quantity * item.productPrice, 0);
                        setTotal(totalAmount);
                    })
                    .catch(error => {
                        console.error('Sepet verisi çekilemedi:', error);
                    });
            })
            .catch(error => {
                console.error('Ürün sepetten kaldırılamadı:', error);
                message.error("Ürün Silinemedi!")
            });
    };

    return (
        <>
            <Header />
            <div className="px-6 mt-4">
                <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
                <div className="cart-total flex justify-end mt-4">
                    <Card className="w-72">
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>{total}₺</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span>KDV</span>
                            <span className="text-red-600">+{(total * 0.2).toFixed(2)}₺</span> {/* KDV %20 */}
                        </div>
                        <div className="flex justify-between">
                            <span>Toplam</span>
                            <span>{(total * 1.2).toFixed(2)}₺</span> {/* Ara Toplam + KDV */}
                        </div>
                        <button className="Btn flex justify-end mt-4" onClick={() => setIsModalOpen(true)}>
                            Sipariş Oluştur
                            <svg className="svgIcon" viewBox="0 0 576 512">
                                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                            </svg>
                        </button>
                    </Card>
                </div>
            </div>
            <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} total={total} kdv={(total * 0.2).toFixed(2)} total2={(total * 1.2).toFixed(2)} />
        </>
    );
}

export default CartPage;