import React from 'react';
import { Link } from 'react-router-dom';
class Register extends React.Component {
	render() {
		return (
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-7 col-lg-5'>
						<div className='wrap'>
							<div className='login-wrap p-4 p-md-5'>
								<div className='d-flex'>
									<div className='w-100 text-center'>
										<h3 className='mb-4'>Register</h3>
									</div>
								</div>
								<form action='#' className='signin-form'>
									<div className='form-group mt-3'>
										<label
											className='form-control-placeholder'
											htmlFor='username'>
											Username
										</label>
										<input
											type='text'
											className='form-control'
											required=''
											onChange={(e) => {}}
										/>
									</div>
									<div className='form-group my-3'>
										<label
											className='form-control-placeholder'
											htmlFor='password'>
											Password
										</label>
										<input
											id='password-field'
											type='password'
											className='form-control'
											required=''
											onChange={(e) => {}}
										/>
										<span
											toggle='#password-field'
											className='fa fa-fw fa-eye field-icon toggle-password'></span>
									</div>
									<div className='form-group my-3'>
										<button
											type='submit'
											className='form-control btn btn-primary rounded submit px-3'>
											Register
										</button>
									</div>
									<div className='form-group d-md-flex'>
										<div className='w-100'>
											<p className='text-end'>
												Already a member?{' '}
												<Link
													to={'/'}
													data-toggle='tab'>
													Login
												</Link>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
