import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext/UserContext';

const LogIn = () => {
    const { logIn, googleSingin, gitHubSingin } = useContext(AuthContext)
    const navigate = useNavigate()
    const location =useLocation()
    const from = location.state?.from?.pathname || '/';
    //email password
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        logIn(email, password)
            .then(result => {
                const user = result.user
                toast.success(`Successfully log in!`)
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
            // console.log(email,password)
        navigate(from, {replace: true})

    }
    //google auth
    const googleProvider = new GoogleAuthProvider()
    const handleGoogleSingin = () => {
        googleSingin(googleProvider)
            .then(result => {
                const user = result.user
                toast.success(`Successfully log in!`)
                console.log(user)
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
        navigate(from,{replace: true})
    }
    //github auth
    const gitHubProvider = new GithubAuthProvider()
    const handleGitHubSingin = () => {
        gitHubSingin(gitHubProvider)
            .then(result => {
                const user = result.user
                toast.success(`Successfully log in!`)
                console.log(user)
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
        navigate(from,{replace: true})
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" className="input input-bordered" name='email' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" name='password' />
                                    <label className="label">
                                        <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                        <Link to='/register' className="label-text-alt link link-hover text-violet-600">Create Account?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                        <div className="form-control mt-6">
                            <button onClick={handleGoogleSingin} className="btn btn-primary">Login with Google</button>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={handleGitHubSingin} className="btn btn-primary">Login with GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;