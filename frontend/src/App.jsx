import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";
import FoodsPage from "./pages/FoodsPage";
import FoodDetailPage from "./pages/FoodDetailPage";
import FoodEditPage from "./pages/FoodEditPage";
import FoodCreatePage from "./pages/FoodCreatePage";

function App() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("top");

    const [foods, setFoods] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    const [selectedFood, setSelectedFood] = useState(null);
    const [editCategory, setEditCategory] = useState("");
    const [editQuantity, setEditQuantity] = useState("");
    const [editExpirationDate, setEditExpirationDate] = useState("");

    const updateFood = () => {
        fetch(`http://localhost:8080/foods/${encodeURIComponent(selectedFood.name)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                category: editCategory,
                quantity: Number(editQuantity),
                expirationDate: editExpirationDate,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSelectedFood(data);

                setFoods(
                    foods.map((food) =>
                        food.name === data.name ? data : food
                    )
                );

                setPage("detail");
            });
    };

    const deleteFood = (name) => {
        fetch(
            `http://localhost:8080/foods?name=${encodeURIComponent(name)}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        )
            .then((response) => {
                if (response.ok) {
                    setFoods(
                        foods.filter((food) => food.name !== name)
                    );
                }
            });
    };

    const createFood = () => {

        console.log("送信する賞味期限:", expirationDate);

        fetch("http://localhost:8080/foods", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                category: category,
                quantity: Number(quantity),
                expirationDate: expirationDate,
            }),
        })
            .then((response) => {
                console.log("登録ステータス:", response.status);

                if (!response.ok) {
                    throw new Error(`登録失敗: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => { console.log("登録結果:", data);

                setFoods([...foods, data]);
                setPage("foods");
            })
            .catch((error) => {
                console.error("登録エラー:", error);
            });
    };

    const logout = () => {
        fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => {
                console.log("logout status:", response.status);
                console.log("logout ok:", response.ok);

                if (response.ok) {
                    setLoggedIn(false);
                    setPage("top");
                }
            })
            .catch((error) => {
                console.error("logout error:", error);
            });
    };

    const login = () => {
        const params = new URLSearchParams();

        params.append("loginId", loginId);
        params.append("password", password);

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: params,
        })
            .then((response) => {
                console.log("login status:", response.status);
                console.log("login ok:", response.ok);

                if (response.ok) {
                    setLoggedIn(true);
                    setPage("top");
                }
            });
    };

    useEffect(() => {
        if (!loggedIn) {
            return;
        }

        fetch("http://localhost:8080/foods", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => setFoods(data));
    }, [loggedIn]);

    if (!loggedIn) {
        return (
            <LoginPage
                loginId={loginId}
                setLoginId={setLoginId}
                password={password}
                setPassword={setPassword}
                login={login}
            />
        );
    }

    if (page === "top") {
        return <TopPage setPage={setPage} logout={logout} />;
    }

    if (page === "foods") {
        return (
            <FoodsPage
                foods={foods}
                setSelectedFood={setSelectedFood}
                setPage={setPage}
                deleteFood={deleteFood}
            />
        );
    }

    if (page === "detail") {
        return (
            <FoodDetailPage
                selectedFood={selectedFood}
                setEditCategory={setEditCategory}
                setEditQuantity={setEditQuantity}
                setEditExpirationDate={setEditExpirationDate}
                setPage={setPage}
            />
        );
    }

    if (page === "edit") {
        return (
            <FoodEditPage
                selectedFood={selectedFood}
                editCategory={editCategory}
                setEditCategory={setEditCategory}
                editQuantity={editQuantity}
                setEditQuantity={setEditQuantity}
                editExpirationDate={editExpirationDate}
                setEditExpirationDate={setEditExpirationDate}
                updateFood={updateFood}
                setPage={setPage}
            />
        );
    }

    if (page === "create") {
        return (
            <FoodCreatePage
                name={name}
                setName={setName}
                category={category}
                setCategory={setCategory}
                quantity={quantity}
                setQuantity={setQuantity}
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
                createFood={createFood}
                setPage={setPage}
            />
        );
    }

    return null;
}
export default App;