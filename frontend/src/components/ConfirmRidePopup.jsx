import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopup = (props) => {
    console.log(props)
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        
        if (!otp || otp.length < 4) {
            alert("Please enter valid OTP")
            return
        }

        console.log("Submitting OTP:", otp)

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
                params:{
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log("✅ Ride started:", response.data)
            
            // Close popups
            props.setRidePopupPanel(false)
            props.setConfirmRidePopupPanel(false)
            
            // ✅ Navigate with ride data
            navigate("/captain-riding", { 
                state: { ride: response.data } 
            })

        } catch (error) {
            console.error("❌ Error:", error)
            alert(error.response?.data?.message || "Failed to confirm ride")
        }
    }

    return (
        <div>
            {/* Title */}
            <h3 className="font-[F3] text-center text-2xl font-semibold mb-2">
                Every great journey starts with a single confirm.
            </h3>

            {/* User Card */}
            <div className='flex items-center justify-between mb-6 bg-gray-200 rounded-2xl p-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-18 w-18 rounded-full object-cover' src="https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g" alt="" />
                    <h2 className='font-[F1] text-xl'> {props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname }</h2>
                </div>
                <h5 className='font-[F3] text-lg font-semibold text-gray-600'>2.2 KM</h5>
            </div>

            <div className="flex flex-col items-center">
                {/* Ride Details */}
                <div className="w-full space-y-4">
                    {/* Pickup */}
                    <div className="flex items-center border-b-2 border-gray-300 pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-range-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">562/11-A</h1>
                            <h1 className="text-sm font-[F1] leading-5 text-gray-600">
                                {props.ride?.pickup}
                            </h1>
                        </div>
                    </div>

                    {/* Drop */}
                    <div className="flex items-center border-b-2 border-gray-300 pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-2-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">353B/5/532-A</h1>
                            <h1 className="text-sm font-[F1] leading-5 text-gray-600">
                                {props.ride?.destination}
                            </h1>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-center pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-money-rupee-circle-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">&#8377; {props.ride?.fare}</h1>
                            <p className="text-sm font-[F1] leading-5 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="w-full  mt-4 ">
                    <form onSubmit={submitHandler} className='w-full flex flex-col items-center gap-3'>
                        <input 
                            type="number" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="p-3 rounded-3xl bg-[#eee] bg-opacity-80 px-10 py-2 text-lg font-[F2] mt-5 w-2/3 outline-none text-center" 
                            placeholder='Enter OTP'  
                        />
                        
                        {/* Confirm Button */}
                        <button
                            type="submit"
                            className="w-3/4 text-center bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 
                                       transition-all duration-200 px-6 py-2 rounded-full text-lg font-[F2] 
                                       border border-gray-700 shadow-sm active:scale-95"
                        >
                            Confirm Ride
                        </button>

                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false);
                                props.setRidePopupPanel(false);
                            }}
                            className="w-3/4 bg-rose-100 text-rose-600 hover:bg-rose-200 active:bg-rose-300 
                                       transition-all duration-200 px-6 py-2 rounded-full text-lg font-[F2] 
                                       border border-rose-300 shadow-sm active:scale-95"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup
