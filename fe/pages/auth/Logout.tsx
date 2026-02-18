import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../services/api'
import * as auth from '../../utils/auth'

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        const doLogout = async () => {
            try {
                await logoutApi()     // 1️⃣ server logout
            } catch (error) {
                // optional: log error
                console.error('Logout API failed', error)
            } finally {
                auth.logout()         // 2️⃣ clear local token
                navigate('/login', { replace: true }) // 3️⃣ redirect
            }
        }

        doLogout()
    }, [navigate])

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            Logging out...
        </div>
    )
}
