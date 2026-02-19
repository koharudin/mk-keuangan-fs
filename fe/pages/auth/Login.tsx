import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useEffect } from 'react'
import { logout } from '../../services/api'
import { alertInfo } from '../../utils/confirmDelete'


export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const doLogin = async function (username, password) {
        const response = await api.post('/login', {
            "username": username,
            "password": password,
            remember,
        })
        const token = response?.data?.data?.app_token?.accessToken

        if (!token) {
            debugger
            await alertInfo({ title: 'Perhatian', text: response?.data?.data?.message, icon: 'warning', timer: 3000 })
            return
        }
        else {
            localStorage.setItem("app_tokenx", response?.data?.data?.app_token?.accessToken);
            localStorage.setItem("anak", "andini");
            navigate('/', { replace: true })
        }



    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            doLogin(email, password)
        } catch (err) {
            console.error(err)
            alert('Login gagal')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        // doLogin("koharudin.mail07@gmail.com", "admin");
        // navigate('/', { replace: true })
    }, [])

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-6">
                    <div className="card">
                        <div className="card-body">

                            {/* Logo */}
                            <div className="app-brand justify-content-center mb-6">
                                <a href="/" className="app-brand-link">
                                    <span className="app-brand-logo demo">
                                        <span className="text-primary">
                                            {/* SVG tetap */}
                                            <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M0.0017 0V6.854S-0.1332 9.012 1.9809 10.839L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.238 0H0.0017Z"
                                                    fill="currentColor"
                                                />
                                                <path opacity="0.06" fillRule="evenodd" clipRule="evenodd"
                                                    d="M7.6982 16.4364L12.5199 3.237L16.5541 7.256L7.6982 16.4364Z"
                                                    fill="#161616"
                                                />
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M7.773 16.3566L23.6563 0H32V6.8838S31.8262 9.1784 30.6591 10.4057L19.7824 22H13.6938L7.773 16.3566Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                    <span className="app-brand-text demo text-heading fw-bold">
                                        SAKU
                                    </span>
                                </a>
                            </div>

                            <h4 className="mb-1 text-center" >TERUKUR. AMANAH👋</h4>
                            <p className="mb-6" style={{ display: "none" }}>

                                “Dan orang-orang yang apabila membelanjakan (harta), mereka tidak berlebihan dan tidak kikir, tetapi berada di tengah-tengah.”
                                (QS. Al-Furqan: 67)
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="mb-4">
                                <div className="mb-6">
                                    <label className="form-label">Email or Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your email or username"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="mb-6 form-password-toggle">
                                    <label className="form-label">Password</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="············"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text cursor-pointer">
                                            <i className="icon-base ti tabler-eye-off" />
                                        </span>
                                    </div>
                                </div>

                                <div className="my-8 d-flex justify-content-between">
                                    <div className="form-check ms-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={remember}
                                            onChange={e => setRemember(e.target.checked)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary d-grid w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Login'}
                                </button>
                            </form>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-icon rounded-circle btn-text-google-plus" onClick={() => {
                                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
                                }}>
                                    <i className="icon-base ti tabler-brand-google-filled" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
