import { ArrowDownOutlined } from "@ant-design/icons";
import Footer from '../footer/Footer';

const images = () => {
    return (
        <div className="home">
            <div className="main-picture-container">
                <div className="picture flex flex-col gap-40 justify-center items-center">
                    <img src="" alt="" />
                    <div className="picture-text">Evinizi beraber dekore edelim...</div>
                    <a href="#info">
                        <div className="picture-button"><ArrowDownOutlined style={{ color: 'white', fontSize: '32px' }} /></div>
                    </a>
                </div>
            </div>
            <div id="info" className="info">
                <div className="info-text">
                    <h1>SEQUOIA Tasarımlar</h1>
                    <h2>2005'den beri daha iyi ortamlar için dekorasyon ve iç mekan ürünleri tasarlıyoruz.</h2>
                    <p>Güncel trendleri yakından takip ediyor, size uygun ferah ve geniş yaşam alanları dekore ediyoruz. İç mekana uygun konsept tasarım ürünler imal ederek aydınlatmadan dresuara, dolaplardan sehpalara, renk kombinlerinden fayans ve parkelere detaylı hizmet veriyoruz.</p>
                </div>
                <div className="info-images">
                    <div className="info-image1">
                        <img src="images/resim1.jpeg" alt="" />
                    </div>
                    <div className="info-image2">
                        <img src="images/resim2.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="screen flex justify-between color-4 gap-6 px-6 py-6">
                <a href="/parke">
                    <div className="product1">
                        <img src="images/resim3.jpg" alt="" className="zoom-image" />
                    </div>
                </a>
                <div className="mid-side flex-col flex gap-7">
                    <a href="/polimer-panel">
                        <div className="product2">
                            <img src="images/resim4.jpg" alt="" className="zoom-image" />
                        </div>
                    </a>
                    <a href="/duvar-profili">
                        <div className="product3">
                            <img src="images/resim5.jpg" alt="" className="zoom-image" />
                        </div>
                    </a>
                </div>
                <div className="right-side flex-col flex gap-7">
                    <a href="/lam-panel">
                        <div className="product4">
                            <img src="https://cdn.agt.com.tr/assets/img/products/W3LyFwbiLz1665663086884.webp" alt="" className="zoom-image" />
                        </div>
                    </a>
                    <a href="/mobilya-profili">
                        <div className="product5">
                            <img src="https://cdn.agt.com.tr/assets/img/products/WlqmqkG3as1665663210348.webp" alt="" className="zoom-image" />
                        </div>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default images