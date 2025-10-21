import { useState, useEffect } from "react";
import AdminPanelSlider from "./AdminPanelSlider";
import { Button, message } from "antd";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [parquets, setParquets] = useState([]);
    const [panels, setPanels] = useState([]);
    const [profiles, setProfiles] = useState([]);

    //Parkeleri getirme
    const getParquets = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/parquet/get-all-parquet");
            const data = await res.json();
            setParquets(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getParquets();
    }, []);

    //Panel Getirme
    const getPanels = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/panel/get-all-panel");
            const data = await res.json();
            setPanels(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPanels();
    }, []);

    //Profil Getirme
    const getProfiles = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/profiles/get-all-profile");
            const data = await res.json();
            setProfiles(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProfiles();
    }, []);

    //Çıkış Yapma Fonksiyonu
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.status === 200) {
                localStorage.removeItem('token');
                message.success("Çıkış Yapıldı");
                navigate("/login");
            } else {
                message.error("Çıkış yapılamadı, tekrar deneyin");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <AdminPanelSlider
                title={"Parkeler"}
                array={parquets}
                update={getParquets}
                updateUrl={"parquet/update-parquet"}
                addUrl={"parquet/add-parquet"}
                deleteUrl={"parquet/delete-parquet"}
            />
            <AdminPanelSlider
                title={"Paneller"}
                array={panels}
                update={getPanels}
                updateUrl={"panel/update-panel"}
                addUrl={"panel/add-panel"}
                deleteUrl={"panel/delete-panel"}
            />
            <AdminPanelSlider
                title={"Profiller"}
                array={profiles}
                update={getProfiles}
                updateUrl={"profiles/update-profile"}
                addUrl={"profiles/add-profile"}
                deleteUrl={"profiles/delete-profile"}
            />
            <div className="flex flex-row">
                <a href="/">
                    <Button size="large" type="primary" className="flex ml-20" style={{ backgroundColor: '#333' }}>Ana Sayfa</Button>
                </a>
                <Button onClick={onFinish} loading={loading} size="large" type="primary" className="flex ml-20" style={{ backgroundColor: '#333' }}>Çıkış Yap</Button>
            </div>
        </div>
    )
}

export default AdminPage;