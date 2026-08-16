function LoginPage({
                       loginId,
                       setLoginId,
                       password,
                       setPassword,
                       login,
                   }) {
    return (
        <div>
            <h1>ポータブル冷蔵庫</h1>

            <h2>ログイン</h2>

            <div>
                <label>ログインID：</label>
                <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                />
            </div>

            <div>
                <label>パスワード：</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="button" onClick={login}>
                ログイン
            </button>
        </div>
    );
}

export default LoginPage;