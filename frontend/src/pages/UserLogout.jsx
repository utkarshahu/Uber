import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/users/login')
        }
      } catch (error) {
        // console.error("Logout failed:", error.response?.data || error.message)
        // Optional: redirect even if error
        navigate('/users/login')
      }
    }

    logoutUser()
  }, [navigate])

  return <div>Logging out...</div>
}

export default UserLogout
