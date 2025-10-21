import Header from "../components/header/Header";
import Button from "../components/header/button/Button";
import Home from "../components/home/Home";

const HomePage = () => {
    return (
        <>
            <Header />
            <div className="home">
                <Home />
            </div>
        </>
    )
}

export default HomePage