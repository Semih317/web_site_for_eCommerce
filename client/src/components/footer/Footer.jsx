import { PhoneOutlined, YoutubeOutlined, InstagramOutlined, PinterestOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-item">
                    <img src="images/logo2.png" alt="" />
                    <p>2005'den beri daha iyi ortamlar için dekorasyon ve iç mekan ürünleri tasarlıyoruz.</p>
                </div>
                <div className="col3">
                    <div className="contact">
                        <h1>İletişim</h1>
                        <p><PhoneOutlined style={{ color: '#EEEEEE', fontSize: '30px' }} />0541 374 09 10</p>
                    </div>
                </div>
                <div className="col3">
                    <div className="social-media">
                        <h1>Sosyal Medya</h1>
                        <div className="social-links">
                            <div className="youtube">
                                <a href="https://www.youtube.com/channel/UCVbnZiESlGDAM3GsjmjJ95A" target="_blank" rel="noreferrer"><YoutubeOutlined style={{ fontSize: '30px' }} /></a>
                            </div>
                            <div className="instagram">
                                <a href="https://www.instagram.com/semihunalmis/" target="_blank" rel="noreferrer"><InstagramOutlined style={{ fontSize: '30px' }} /></a>
                            </div>
                            <div className="pinterest">
                                <a href="https://tr.pinterest.com/" target="_blank" rel="noreferrer"><PinterestOutlined style={{ fontSize: '30px' }} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer