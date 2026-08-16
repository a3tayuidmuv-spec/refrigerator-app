function FoodsPage({
                       foods,
                       setSelectedFood,
                       setPage,
                       deleteFood,
                   }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>食材一覧</h2>

            {foods.length === 0 ? (
                <p>食品が登録されていません。</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {foods.map((food) => (
                        <li key={food.name}>
                            {food.name} - {food.quantity}個

                            <button
                                type="button"
                                onClick={() => {
                                    fetch(
                                        `http://localhost:8080/foods/${encodeURIComponent(food.name)}`,
                                        {
                                            credentials: "include",
                                        }
                                    )
                                        .then((response) => response.json())
                                        .then((data) => {
                                            setSelectedFood(data);
                                            setPage("detail");
                                        });
                                }}
                            >
                                詳細
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const confirmed = window.confirm(
                                        `${food.name}を削除しますか？`
                                    );

                                    if (confirmed) {
                                        deleteFood(food.name);
                                    }
                                }}
                            >
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <br />

            <button type="button" onClick={() => setPage("create")}>
                食材登録
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("top")}>
                トップページへ戻る
            </button>
        </div>
    );
}

export default FoodsPage;