import React from 'react';
import axios from 'axios';
class LoginPage extends React.Component{
    render(){
        return (
            <div className="mt-5">
                <div className="text-center h-100 "> 
                    <main className="w-25 mx-auto h-25">
                        <form>
                            <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                            <h1 className="h3 mb-3 fw-normal">Giriş Yapın</h1>

                            <div className="form-floating">
                                <input type="email" className="form-control mb-3" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">E-Posta</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control mb-3" id="floatingPassword" placeholder="Parola" />
                                <label htmlFor="floatingPassword">Parola</label>
                            </div>

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Beni Hatırla
                                </label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e) => {
                                e.preventDefault();
                                let email = document.getElementById('floatingInput').value;
                                let password = document.getElementById('floatingPassword').value;
                                axios.get(`http://localhost:8000/user?email=${email}&password=${password}`);
                            }}>Giriş</button>
                            <p className="mt-5 mb-3 text-muted">© {new Date().getYear()+1900}</p>
                        </form>
                    </main>
                </div>
            </div>
        );
    }
}
export default LoginPage;