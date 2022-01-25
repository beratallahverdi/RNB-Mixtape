import { React } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	if (localStorage.getItem('refresh') !== null) {
		return (
			<div className='App'>
				<div>
					<nav className='navbar fixed-top navbar-light bg-light'>
						<div className='container-fluid'>
							<Link className='navbar-brand' to={'#'}>
								Dizayn Vip
							</Link>
							<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
								<li className='nav-item dropdown'>
									<Link
										className='nav-link dropdown-toggle'
										to={'#'}
										id='navbarDropdown'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'>
										Dropdown
									</Link>
									<ul
										className='dropdown-menu position-absolute p-0 right-0'
										aria-labelledby='navbarDropdown'
										style={{
											width: '300px',
											left: '-200px',
										}}>
										<div className='card'>
											<div className='card-header'>
												<p className='card-title'>
													Account
												</p>
											</div>
											<div className='card-body'>
												<p className='card-text'>
													User
												</p>
											</div>
											<div className='card-footer'>
												<button
													className='btn btn-danger text-light'
													onClick={(e) => {
														e.preventDefault();
														localStorage.removeItem(
															'refresh'
														);
														localStorage.removeItem(
															'access'
														);
														window.location.reload();
													}}>
													Logout
												</button>
											</div>
										</div>
									</ul>
								</li>
							</ul>
						</div>
					</nav>
					<div className='content min-vh-100 overflow-auto'>
						<Routes>
							<Route exact path='/' element={<Home />} />
						</Routes>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className='content min-vh-100 overflow-auto'>
					<Routes>
						<Route exact path='/' element={<Login />} />
						<Route exact path='/register' element={<Register />} />
					</Routes>
				</div>
			</div>
		);
	}
}

export default App;
