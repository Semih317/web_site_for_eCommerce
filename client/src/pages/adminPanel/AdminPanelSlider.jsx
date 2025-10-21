import { useState } from "react";
import { message } from "antd";
import AddModal from "./AddModal";
import CreateModal from "./CreateModal";

const AdminPanelSlider = ({ title, array, update, updateUrl, addUrl, deleteUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const vileda = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/${deleteUrl}`, {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: { "Content-type": "application/json;charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Başarıyla Silindi");
                update();
            } else {
                message.error("Silme işlemi başarısız!");
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!");
            console.log(error);
        }
    };

    return (
        <div className="admin-panel-main">
            <div className="div">
                <h2>{title}</h2>
            </div>
            <div className="admin-panel-parke">
                <div className="add-button-admin">
                    <button
                        title="Add New"
                        class="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            class="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:duration-0 duration-300"
                        >
                            <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                stroke-width="1.5"
                            ></path>
                            <path d="M8 12H16" stroke-width="1.5"></path>
                            <path d="M12 16V8" stroke-width="1.5"></path>
                        </svg>
                    </button>
                </div>
                <div className="card-section2">
                    {array.map((item) => (
                        <div className="card-container2" key={item._id}>
                            <div className="card2">
                                <img src={item.img} alt={item.name} />
                                <div className="card-content">
                                    <h3>{item.name}</h3>
                                    <p>{item.price} ₺</p>
                                    <p>{item._id}</p>
                                    <div className="flex flex-row">
                                        <div className="button1">
                                            <button className="btn" onClick={() => {
                                                setIsModalOpen(true);
                                            }}>Güncelle</button>
                                        </div>
                                        <div className="button2 pt-5 pl-12">
                                            <button className="bin-button" onClick={() => vileda(item._id)}>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refreshParquets={update} reqUrl={updateUrl} />
            <AddModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} refreshParquets={update} reqUrl={addUrl} />
        </div>
    )
}

export default AdminPanelSlider