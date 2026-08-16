function TopPage({ setPage, logout }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>トップページ</h2>

            <button type="button" onClick={() => setPage("foods")}>
                食材一覧
            </button>

            <br />
            <br />

            <button type="button" onClick={() => setPage("create")}>
                食材登録
            </button>

            <br />
            <br />

            <button type="button" onClick={logout}>
                ログアウト
            </button>
        </div>
    );
}

export default TopPage;