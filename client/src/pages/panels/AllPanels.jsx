import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useState, useEffect } from "react";
import axios from 'axios';
import { message } from 'antd';

const AllPanels = () => {

    const [panels, setPanels] = useState([]);
    const [userId, setUserId] = useState(null);
    const [sorted, setSorted] = useState([]);
    const [normal, setNormal] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.user_id);
        }

        const getPanels = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/panel/get-all-panel");
                const data = await res.json();
                setPanels(data);
                setNormal(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPanels();
    }, [])

    const handleAddToCart = async (productId, productName, productPrice, productImg) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/cart/${userId}`, {
                productId: productId,
                quantity: 1,
                productImg: productImg,
                productName: productName,
                productPrice: productPrice
            });
            if (response.status === 200) {
                message.success('Ürün sepete eklendi!');
            }
        } catch (error) {
            console.error('Sepete ekleme yapılırken hata oluştu:', error);
            message.error('Ürün sepete eklenirken bir hata oluştu.');
        }
    };

    const sortNormal = () => {
        return normal;
    };

    const sortAscend = () => {
        const sortedArray = [...sorted].sort((a, b) => a.price - b.price);
        return sortedArray;
    };

    const sortDescend = () => {
        const sortedArray = [...sorted].sort((a, b) => b.price - a.price);
        return sortedArray;
    };

    return (
        <div>
            <Header item={panels} />
            <div className="body-top">
                <div className="body-top-column">
                    <div className="body-top-image">
                        <img src="https://cdn.agt.com.tr/assets/img/products/gLYDd31ftk1687415007162.webp" alt="" />
                    </div>
                    <div className="body-top-column-text">
                        <span className="marco-polo">Sequoia Panelleri</span>
                        <p className="marco-polo-bottom">Sequoia Paneller,kolay temizlenme, hızlı ve kolay montaj, çizilmeye ve UV ışınlarına karşı dayanıklı yapısıyla yaşam alanlarında oldukça çok tercih edilir. Birbirinden farklı renk ve desenlere sahip olan Sequoia MDF Lam Paneller eşsiz bir tasarım ve dekorasyon yapmanıza olanak sunar.</p>
                    </div>
                </div>
                <div className="body-top-text flex justify-between gap-16">
                    <div className="text1">
                        <span>EO, Antibakteriyel, EPD, CE, TSCA CARB II, Entegre Yönetim Sistemleri Sertifikaları Sequoia Panellerin güvenilirliğini ve kalitesini gösterir. Sürdürülebilirlik politikaları gereği Sequoia, MDF Lam Panel üretimi yaparken çevre dostu bir politikayla hareket eder.</span>
                    </div>
                    <div className="text2">
                        <span>Sequoia Panellerin fiyatları kullanılacak alana göre, panel ebatı, deseni ve özelliklerine göre farklılık gösterir.</span>
                    </div>
                </div>
            </div>
            <div className="catalog-section">
                <div className="sort-button">
                    <label className="popup">
                        <input type="checkbox" />
                        <div className="burger" tabIndex="0">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <nav className="popup-window">
                            <ul>
                                <li>
                                    <button onClick={() => setSorted(sortNormal())}>
                                        <span>Normal Sıralama</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSorted(sortAscend())}>
                                        <span>Fiyata Göre Artan</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSorted(sortDescend())}>
                                        <span>Fiyata Göre Azalan</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </label>
                </div>
                <div className="card-section">
                    {sorted.map((item) => (
                        <div id={item.name} className="card-container">
                            <div className="card">
                                <img src={item.img} alt="" />
                                <div className="card-content">
                                    <h3>{item.name}</h3>
                                    <p>{item.price} ₺</p>
                                    <button className="btn" onClick={() => handleAddToCart(item._id, item.name, item.price, item.img)}>Sepete Ekle</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllPanels