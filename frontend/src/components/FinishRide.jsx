import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinishRide = ({ ride, setFinishRidePanel }) => {
const navigate = useNavigate();
    async function endRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: ride._id
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("✅ Ride ended successfully:", response.data);
            if(response.status === 200){
                
                navigate('/captains/home');
            }
            // Optionally, you can add further actions here, like navigating to another page
        } catch (error) {
            console.error("❌ Error ending ride:", error);
        }   
    }


    return (
        <div>
            {/* Down Arrow */}
            <h5 
                onClick={() => setFinishRidePanel(false)}
                className="absolute top-1 left-1/2 -translate-x-1/2 text-gray-800 p-2 cursor-pointer"
            >
                <i className="ri-arrow-down-wide-fill text-2xl font-semibold"></i>
            </h5>

            {/* Title - Same as ConfirmRidePopup */}
            <h3 className="font-[F3] text-center text-2xl font-semibold mb-2">
                Finish this Ride
            </h3>

            {/* User Card - Same style as ConfirmRidePopup */}
            <div className='flex items-center justify-between mb-6 bg-gray-200 rounded-2xl p-2'>
                <div className='flex items-center gap-3'>
                    <img 
                        className='h-18 w-18 rounded-full object-cover' 
                        src="https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g" 
                        alt="User" 
                    />
                    <h2 className='font-[F1] text-xl'>
                        {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                    </h2>
                </div>
                <h5 className='font-[F3] text-lg font-semibold text-gray-600'>
                    {ride?.distance ? (ride.distance / 1000).toFixed(1) : '2.2'} KM
                </h5>
            </div>

            <div className="flex flex-col items-center">
                {/* Ride Details - Same as ConfirmRidePopup */}
                <div className="w-full space-y-4">
                    {/* Pickup */}
                    <div className="flex items-center border-b-2 border-gray-300 pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-range-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">562/11-A</h1>
                            <h1 className="text-sm font-[F1] leading-5 text-gray-600">
                                {ride?.pickup || 'Pickup location'}
                            </h1>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center border-b-2 border-gray-300 pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-2-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">353B/5/532-A</h1>
                            <h1 className="text-sm font-[F1] leading-5 text-gray-600">
                                {ride?.destination || 'Destination'}
                            </h1>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-center pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-money-rupee-circle-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">&#8377; {ride?.fare || '0'}</h1>
                            <p className="text-sm font-[F1] leading-5 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                {/* Finish Button - Same style as Confirm button */}
                <div className="w-full mt-4">
                    <button
                    onClick={endRide} 
                        className="bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 rounded-full w-full"
                    >
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
