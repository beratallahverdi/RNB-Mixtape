import React from 'react';
import axios from 'axios';
class SignUpPage extends React.Component{
    render(){
        return (
        <div className="maincontainer">
          <div class="container-fluid">
                <div class="card bg-light">
                <article class="card-body mx-auto" style={{maxWidth: "400px"}}>
                    <h4 class="card-title mt-3 text-center">Hesap Oluştur</h4>
                    <p class="divider-text">
                        <span class="bg-light"></span>
                    </p>
                    <form className="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input name="" class="form-control" id="adsoyad" placeholder="Ad Soyad" type="text" />
                    </div> 
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                        </div>
                        <input name="" class="form-control" id="eposta" placeholder="E-Posta" type="email" />
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                        </div>
                       
                        <input name="" class="form-control" id="telefon" placeholder="0-530 351 9329" type="text" />
                    </div> 
                    <div class="input-group">
                        
                        
                    </div> 
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" id="parola" placeholder="Parola" type="password" />
                    </div> 
                    <div class="input-group mb-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" id="parola2" placeholder="Parola Tekrar" type="password" />
                    </div>                                 
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-block" type="submit" onClick={(e) => {
                            e.preventDefault();
                            let adSoyad = document.getElementById('adsoyad').value;
                            let email = document.getElementById('eposta').value;
                            let telefonNo = document.getElementById('telefon').value;
                            let password = document.getElementById('parola').value;
                            let password2 = document.getElementById('parola2').value;

                            axios.post("http://127.0.0.1:8000/user/",{
                                headers:{
                                    "Content-Type":"text/plain",
                                    "Access-Control-Allow-Origin": "*"
                                },
                                data:{
                                    "first_name":adSoyad,
                                    "last_name":adSoyad,
                                    "username":email,
                                    "email":email,
                                    "phone_number":telefonNo,
                                    "user_id":password,
                                    "_id":password,
                                }
                            });
                        }} > Yeni Hesap Oluştur  </button>
                    </div>  
                    <div>
                        <br>
                        </br>
                    </div>     
                    <p class="text-center">Hesabın Varmı? <a href="/Login">Giriş Yap</a> </p>                                                                 
                </form>
                </article>
                </div> 
                </div> 
             
        </div>
        );
    }
}
export default SignUpPage;