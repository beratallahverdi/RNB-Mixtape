import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
class Home extends React.Component {
	constructor(props) {
		super(props);
		// Set initial state
		this.state = { groups: this.props.groups ?? [] };
		console.log(localStorage.getItem('refresh'));
		// Binding this keyword
		this.addItem = this.addItem.bind(this);
		this.addGroup = this.addGroup.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.itemComplete = this.itemComplete.bind(this);
		this.groupSave = this.groupSave.bind(this);
	}
	componentDidMount() {
		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.get('http://127.0.0.1:8000/api/v1/list', {
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + auth.data.access,
						},
					})
					.then((res) => {
						this.setState({ groups: res.data });
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	addItem(groupUUID) {
		let groups = this.state.groups;
		let data = {
			listUUID: groupUUID,
			uuid: uuidv4(),
			description: 'Add a description',
		};

		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.post('http://127.0.0.1:8000/api/v1/todo', data, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + auth.data.access,
						},
					})
					.then((res) => {
						groups
							.find((group) => group.uuid === groupUUID)
							.todo_list.push({
								uuid: data.uuid,
								description: 'Add a description',
							});
						this.setState({ groups: groups });
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}
	addGroup() {
		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.post(
						'http://127.0.0.1:8000/api/v1/list',
						{
							uuid: uuidv4(),
							title: 'Add a title',
						},
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + auth.data.access,
							},
						}
					)
					.then((res) => {
						let groups = this.state.groups;
						groups.push({ ...res.data, todo_list: [] });
						this.setState({ groups: groups });
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	titleChange(e, groupUUID) {
		let groups = this.state.groups;
		let group = groups.find((group) => group.uuid === groupUUID);
		groups.find((group) => group.uuid === groupUUID).title = e.target.value;

		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.put(
						'http://127.0.0.1:8000/api/v1/list',
						{
							listId: group.id,
							description:
								document.getElementById(groupUUID).value,
							uuid: groupUUID,
						},
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + auth.data.access,
							},
						}
					)
					.then((res) => {
						this.setState({ groups: groups });
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	inputChange(e, groupUUID, itemUUID) {
		let groups = this.state.groups;
		let data = {
			listUUID: groupUUID,
			description: document.getElementById(itemUUID).value,
			uuid: itemUUID,
		};
		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.put('http://127.0.0.1:8000/api/v1/todo', data, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + auth.data.access,
						},
					})
					.then((res) => {
						groups
							.find((group) => group.uuid === groupUUID)
							.todo_list.find(
								(item) => item.uuid === itemUUID
							).text = e.target.value;
						this.setState({ groups: groups });
					})
					.catch((err) => {
						console.err(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	itemComplete(e, status, itemUUID) {
		let groups = this.state.groups;
		let data = {
			complete: !status,
			uuid: itemUUID,
		};
		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.put('http://127.0.0.1:8000/api/v1/todo', data, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + auth.data.access,
						},
					})
					.then((res) => {
						groups
							.find((group) => group.uuid === res.data.list.uuid)
							.todo_list.find(
								(item) => item.uuid === itemUUID
							).completed = !status;
						this.setState({ groups: groups });
					})
					.catch((err) => {
						console.err(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	groupSave(e, groupUUID) {
		let groups = this.state.groups;
		let data = {
			title: document.querySelector(`input[id='` + groupUUID + `'`).value,
			uuid: groupUUID,
		};
		axios
			.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
				refresh: localStorage.getItem('refresh'),
			})
			.then((auth) => {
				localStorage.setItem('access', auth.data.access);
				axios
					.put('http://127.0.0.1:8000/api/v1/list', data, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + auth.data.access,
						},
					})
					.then((res) => {
						groups.find(
							(group) => group.uuid === res.data.list.uuid
						).title = res.data.title;
						this.setState({ groups: groups });
					})
					.catch((err) => {
						console.err(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		return (
			<div className='mx-5 my-5'>
				<div className='pt-4'>
					<button className='btn btn-primary' onClick={this.addGroup}>
						<i className='bi bi-plus'></i>
						Add Group
					</button>
				</div>
				<div className='d-flex flex-nowrap'>
					{this.state.groups.map((group, groupIndex) => (
						<div
							className='card p-0 m-2'
							style={{ minWidth: '300px' }}
							id={group.uuid}>
							<h5 className='card-title'>
								<div className='input-group'>
									<input
										className='form-control my-2'
										key={group.uuid}
										id={group.uuid}
										type='text'
										defaultValue={group.title}
									/>
									<button
										className=' btn btn-primary input-group-append my-2'
										onClick={(e) =>
											this.groupSave(e, group.uuid)
										}>
										Save
									</button>
								</div>
							</h5>
							<ul className='list-group list-group-flush px-2'>
								{group.todo_list.map((item, index) => (
									<div className='input-group'>
										<input
											className='form-control my-2'
											key={item.uuid.toString()}
											id={item.uuid}
											title={item.due_date}
											type='text'
											defaultValue={item.description}
										/>
										<button
											className=' btn btn-primary input-group-append my-2'
											defaultValue={item.description}
											onClick={(e) =>
												this.inputChange(
													e,
													group.uuid,
													item.uuid
												)
											}>
											Save
										</button>
										<button
											className=' btn btn-success input-group-append my-2'
											defaultValue={item.description}
											onClick={(e) =>
												this.itemComplete(
													e,
													item.completed,
													item.uuid
												)
											}>
											<i
												className={
													item.completed
														? 'bi bi-x'
														: 'bi bi-check'
												}></i>
										</button>
									</div>
								))}
							</ul>
							<div className='card-footer'>
								<button
									className='btn btn-primary w-100'
									onClick={() => this.addItem(group.uuid)}>
									Add a new item
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Home;
