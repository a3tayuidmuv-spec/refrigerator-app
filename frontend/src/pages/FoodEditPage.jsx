function FoodEditPage({
                          selectedFood,
                          editCategory,
                          setEditCategory,
                          editQuantity,
                          setEditQuantity,
                          editExpirationDate,
                          setEditExpirationDate,
                          updateFood,
                          setPage,
                      }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>食材編集</h2>

            {selectedFood && (
                <div>
                    <div>
                        <label>食品名：</label>
                        <input
                            type="text"
                            value={selectedFood.name}
                            readOnly
                        />
                    </div>

                    <div>
                        <label>カテゴリ：</label>
                        <input
                            type="text"
                            value={editCategory}
                            onChange={(e) =>
                                setEditCategory(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>数量：</label>
                        <input
                            type="number"
                            value={editQuantity}
                            onChange={(e) =>
                                setEditQuantity(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>賞味期限：</label>
                        <input
                            type="date"
                            value={editExpirationDate}
                            onChange={(e) =>
                                setEditExpirationDate(e.target.value)
                            }
                        />
                    </div>
                </div>
            )}

            <button type="button" onClick={updateFood}>
                更新
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("detail")}>
                食材詳細へ戻る
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("foods")}>
                食材一覧へ戻る
            </button>
        </div>
    );
}

export default FoodEditPage;