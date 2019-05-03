import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export class App extends Component {
    state = {
        fullName: 'John Doe',
        email: 'jdoe@email.com',
        password: '123456',
        url: 'http://localhost/api',
        error: '',
        users: [],
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    notifySuccess = (message = 'default') => toast.success(message);
    notifyError = (message = 'default') => toast.error(message);

    handleSubmit = async event => {
        event.preventDefault();
        const { fullName, email, password, url } = this.state;

        try {
            const response = await fetch(`${url}/users/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ fullName, password, email }),
            });

            const { data } = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            this.notifySuccess(data);
        } catch (error) {
            this.notifyError(error.message);
        }
    };

    getUsers = async () => {
        const { url } = this.state;

        try {
            const response = await fetch(`${url}/users`, {
                method: 'GET',
            });

            const { data } = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            this.notifySuccess('Success');
            this.setState({ users: data });
        } catch (error) {
            this.notifyError(error.message);
        }
    };

    renderUser = () => {
        const { users } = this.state;

        return users.map(({ _id, name, email, created }) => (
            <tr key={_id}>
                <th scope="row">{_id}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{created}</td>
            </tr>
        ));
    };

    render() {
        const { fullName, password, email, users } = this.state;
        const active = !Boolean(fullName && password && email);

        return (
            <div className="container">
                <ToastContainer />
                <div className="row centered-form">
                    <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Please sign up! <small>It's free!</small>
                                </h3>
                            </div>
                            <div className="panel-body" />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control input-sm"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control input-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control input-sm"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-info btn-block"
                                    disabled={active}
                                />
                            </form>
                            <div className="users">
                                <button
                                    className="btn btn-info btn-block"
                                    onClick={this.getUsers}
                                >
                                    Get All Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {users.length ? (
                    <table className="panel table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Created</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderUser()}</tbody>
                    </table>
                ) : (
                    <p className="panel">No data!</p>
                )}
            </div>
        );
    }
}
