import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import SearchComponent from "../header/SearchComponent"

const Header = ({item}) => {

    const handleButtonClick = (redirectUrl) => {
        const token = localStorage.getItem('token');
        if (token && isValidToken(token)) {
            window.location.href = redirectUrl;
        } else {
            window.location.href = '/login';
        }
    };

    const isValidToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            if (!base64Url) return false;
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            const expiry = payload.exp;
            const now = Math.floor(Date.now() / 1000);
            return expiry > now;
        } catch (e) {
            console.error('Token geçersiz:', e);
            return false;
        }
    };

    return (
        <div className="flex justify-between items-center color-4 border-gray-300 border-b">
            <header className="flex items-center justify-start">
                <div className="logo-container">
                    <a href="/">
                        <img src="images/logo2.png" alt="LOGO" className="logo-image" />
                    </a>
                </div>
                <div className="menu-links pl-12 flex justify-between items-center">
                    <div className="dropdown-parke">
                        <a href="/parke"><button className="custom-button">Parke</button></a>
                        <div className="content-parke">
                            <div className="content-parke-info">
                                <a href="/parke"><h3>PARKE KOLEKSİYONLARI</h3></a>
                                <a href="/marco-polo">MARCO POLO</a>
                                <a href="/luna">LUNA</a>
                                <a href="/yoga">YOGA</a>
                                <a href="/mood">MOOD</a>
                                <a href="/bella-neo">BELLA NEO</a>
                            </div>
                            <div className="parke-image">
                                <img src="images/parke_resim.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-panel">
                        <a href="/panel"><button className="custom-button">Panel</button></a>
                        <div className="content-panel">
                            <div className="content-panel-row">
                                <a href="/polimer-panel">
                                    <div className="content-panel-column">
                                        <div className="content-panel-image">
                                            <img src="images/polimer_kaplı_panel.jpg" alt="" className="zoom-image" />
                                        </div>
                                        <h3>POLİMER KAPLI PANEL</h3>
                                    </div>
                                </a>
                                <a href="/lam-panel">
                                    <div className="content-panel-column">
                                        <div className="content-panel-image">
                                            <img src="images/lam_kaplı_panel.jpg" alt="" className="zoom-image" />
                                        </div>
                                        <h3>LAM KAPLI PANEL</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-panel">
                        <a href="/profil"><button className="custom-button">Profil</button></a>
                        <div className="content-panel">
                            <div className="content-panel-row">
                                <a href="/duvar-profili">
                                    <div className="content-panel-column">
                                        <div className="content-panel-image">
                                            <img src="images/duvar_profili.webp" alt="" className="zoom-image scale-125" />
                                        </div>
                                        <h3>Duvar Profili</h3>
                                    </div>
                                </a>
                                <a href="/mobilya-profili">
                                    <div className="content-panel-column">
                                        <div className="content-panel-image">
                                            <img src="images/mobilya_profili.jpg" alt="" className="zoom-image" />
                                        </div>
                                        <h3>Mobilya Profili</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="pr-10 flex justify-end items-center gap-8">
                <button className="custom-button flex justify-between items-center gap-2" onClick={() => handleButtonClick("/hesabım")}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </button>
                <button className="custom-button flex justify-between items-center gap-2" onClick={() => handleButtonClick("/sepet")}>
                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                </button>
                <SearchComponent items={item}/>
            </div>
        </div>
    )
}

export default Header