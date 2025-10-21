import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useState, useEffect } from "react";
import axios from 'axios';
import { message } from 'antd';

const ParqeutPage = ({ ModelName, TopImage, ModelText }) => {

  const [parquets, setParquets] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sorted, setSorted] = useState([]);
  const [normal, setNormal] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.user_id);
    }

    const getParquets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/parquet/get-all-parquet");
        const data = await res.json();
        setParquets(data);
        setNormal(data);
      } catch (error) {
        console.log(error);
      }
    };
    getParquets();
  }, []);

  useEffect(() => {
    const filteredParquets = parquets.filter(parquet => parquet.model === ModelName);

    if (filteredParquets.length > 0) {
      setArray(filteredParquets);
      setSorted(filteredParquets);
      setNormal(filteredParquets);
    } else {
      setArray(parquets);
      setSorted(parquets);
      setNormal(parquets);
    }
  }, [parquets, ModelName]);

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
  }

  const sortAscend = () => {
    const sortedArray = [...sorted].sort((a, b) => a.price - b.price);
    return sortedArray;
  }

  const sortDescend = () => {
    const sortedArray = [...sorted].sort((a, b) => b.price - a.price);
    return sortedArray;
  }

  return (
    <div>
      <Header item={array} />
      <div className="body-top">
        <div className="body-top-column">
          <div className="body-top-image">
            <img src={TopImage} alt="" />
          </div>
          <div className="body-top-column-text">
            <span className="marco-polo">{ModelName}</span>
            <p className="marco-polo-bottom">{ModelText}</p>
          </div>
        </div>
        <div className="body-top-text flex justify-between gap-16">
          <div className="text1">
            <span>Kullanıcı odaklı, doğa dostu ve sürdürülebilir bir üretim politikası ile hareket eden markamızın laminant parke modelleri; FloorScore® , E0, TSCA, EPD, CE, TSE, Blue Angel ve Hohenstein sertifikalarına sahiptir ve tüm parke modelleri özel standartlarda üretilmektedir.</span>
          </div>
          <div className="text2">
            <span>İç mekan ve ofislerde tercih edebileceğiniz Sequoia Parke fiyatları, tercih edeceğiniz laminant parke modeline, kullanılacak alanın metrekaresine göre farklılık göstermektedir. Bu nedenle parke fiyatlarını araştırırken ihtiyaçlarınızı iyi bir şekilde belirlemeniz ve bir uzmandan yardım almanız önemlidir.</span>
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
            <div key={item._id} className="card-container">
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
  );
};

export default ParqeutPage;