import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import SignUpPage from './Pages/User/SignUpPage';
import LoginPage from './Pages/User/LoginPage';
import HomePage from './Pages/Home/HomePage';
import React from 'react';

class App extends React.Component {
  render(){
    return (
    <div className="App">
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex mb-lg-0 text-white text-decoration-none">
              <h4 className="h4 mb-0">R&amp;B</h4>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li className="nav-item">
                <Link
										className='nav-link px-2 text-secondary'
										to={'/'}
										role='button'>
										Home
								</Link>
              </li>
              <li>
                <Link
										className='nav-link px-2 text-secondary'
										to={'/features'}
										role='button'>
										Features
								</Link>
              </li>
              <li>
                <Link
										className='nav-link px-2 text-secondary'
										to={'/Pricing'}
										role='button'>
										Pricing
								</Link>
              </li>
              <li>
                <Link
										className='nav-link px-2 text-secondary'
										to={'/FAQs'}
										role='button'>
										FAQs
								</Link>
              </li>
              <li>
                <Link
										className='nav-link px-2 text-secondary'
										to={'/About'}
										role='button'>
										About
								</Link>
              </li>
            </ul>
            <div className="text-end">
              <Link
										className='btn btn-outline-light me-2'
										to={'/Login'}
										role='button'>
										Login
							</Link>
              <Link
										className='btn btn-warning'
										to={'/SignUp'}
										role='button'>
										Sign-up
							</Link>
            </div>
          </div>
        </div>
      </header>
      <div>
				<div className='content min-vh-100 overflow-auto'>
					<Routes>
							<Route exact path='/' element={<HomePage />} />
							<Route exact path='/Login' element={<LoginPage />} />
							<Route exact path='/SignUp' element={<SignUpPage />} />
						</Routes>
				</div>
			</div>
    </div>
  );
    }
}

export default App;
