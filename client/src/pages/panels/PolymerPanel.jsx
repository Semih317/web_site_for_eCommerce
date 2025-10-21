import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useState, useEffect } from "react";
import axios from 'axios';
import { message } from 'antd';

const PolymerPanel = () => {

  const [panels, setPanels] = useState([]);
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

  useEffect(() => {
    const filteredPanels = panels.filter(panel => panel.model === "Polimer Kaplı Panel");

    if (filteredPanels.length > 0) {
      setArray(filteredPanels);
      setSorted(filteredPanels);
      setNormal(filteredPanels);
    }
  }, [panels]);

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
      <Header item={array} />
      <div className="body-top">
        <div className="body-top-column">
          <div className="body-top-image">
            <img src="https://cdn.agt.com.tr/assets/img/products/zt9hPxL4tS1629467357874.webp" alt="" />
          </div>
          <div className="body-top-column-text">
            <span className="marco-polo">Polimer Kaplı Panel</span>
            <p className="marco-polo-bottom">Sequoia MDF ile kusursuz bir şekilde üretilen Sequoia Panel Modelleri, farklı dekor ve yüzey seçenekleriyle ev ve iş yerlerinde eşsiz bir tasarım imkanı sağlar. Kolay temizlenme, UV ışınlarına ve çizilmeye karşı dayanıklı yapısıyla Sequoia Panel Modelleri sizlere uzun yıllar boyunca kullanım avantajı sağlarken yapısal özellikleriyle yaşam alanlarında şık bir dokunuş yaratır.</p>
          </div>
        </div>
        <div className="body-top-text flex justify-between gap-16">
          <div className="text1">
            <span>Sequoia Panel modelleri EO, EPD, FSC sertifikalarına sahiptir. Sürdürülebilirlik politikalarımız gereği Sequoia Polimer Paneller, E0 düşük emisyon değerinde ve sıfır atık politikası ile üretilmektedir. Dış etkenlere karşı dayanıklılığı olan Sequoia Polimer Kaplı Panel modelleri, taşıma ve montaj işlemleri için oldukça uygundur.</span>
          </div>
          <div className="text2">
            <span>Sequoia Panel Fiyatları, kullanılacak olan alanın büyüklüğüne, panel ebatlarına göre farklılık gösterebilir. İyi bir bütçe planlaması yapmak için Sequoia Panel Fiyatlarını hesaplamadan önce alan büyüklüğü ve ebatların iyi bir şekilde hesaplanması gerekir.</span>
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

export default PolymerPanel