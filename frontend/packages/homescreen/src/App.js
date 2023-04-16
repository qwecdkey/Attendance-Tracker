import React from "react";
import Homescreen from "./pages/homescreen";


function App() {
    if (localStorage.getItem('access_token') === null) {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.get("access") === null) {
            window.location.href = `https://api.auttend.com/accounts/login?next=${window.location.href}`;
        } else {
            localStorage.setItem('access_token', queryParams.get("access"));
            localStorage.setItem('refresh_token', queryParams.get("refresh"));
            window.location.href = '/'
        }
    }
    return (
        <div>
            {localStorage.getItem('access_token') === null ? (
                <div>
                    <h3>Redirecting to AUthenticate...</h3>
                </div>
            ) : (
                <Homescreen />
            )}
        </div>
    )
}

export default App;
