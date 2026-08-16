function FoodCreatePage({
                            name,
                            setName,
                            category,
                            setCategory,
                            quantity,
                            setQuantity,
                            expirationDate,
                            setExpirationDate,
                            createFood,
                            setPage,
                        }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>食材登録</h2>

            <div>
                <label>食品名：</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>カテゴリ：</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <div>
                <label>数量：</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <div>
                <label>賞味期限：</label>
                <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
            </div>

            <br />

            <button type="button" onClick={createFood}>
                登録
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("foods")}>
                食材一覧へ戻る
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("top")}>
                トップページへ戻る
            </button>
        </div>
    );
}

export default FoodCreatePage;