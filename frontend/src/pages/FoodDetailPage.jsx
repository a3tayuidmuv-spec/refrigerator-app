function FoodDetailPage({
                            selectedFood,
                            setEditCategory,
                            setEditQuantity,
                            setEditExpirationDate,
                            setPage,
                        }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>食材詳細</h2>

            {selectedFood && (
                <div>
                    <p>食品名：{selectedFood.name}</p>
                    <p>カテゴリ：{selectedFood.category}</p>
                    <p>数量：{selectedFood.quantity}個</p>
                    <p>賞味期限：{selectedFood.expirationDate}</p>
                </div>
            )}

            <button
                type="button"
                onClick={() => {
                    setEditCategory(selectedFood.category);
                    setEditQuantity(selectedFood.quantity);
                    setEditExpirationDate(selectedFood.expirationDate);
                    setPage("edit");
                }}
            >
                食材編集
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("foods")}>
                食材一覧へ戻る
            </button>
        </div>
    );
}

export default FoodDetailPage;