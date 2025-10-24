import React from 'react'
import { Link } from 'react-router-dom'


const FinishRide = (props) => {
  return (
    <div>
         <h5
                onClick={() => props.setFinishRidePanel(false)}
                className="absolute top-1 left-1/2 -translate-x-1/2 text-gray-800 p-2 cursor-pointer"
            >
                <i className="ri-arrow-down-wide-fill text-2xl  font-semibold"></i>
            </h5>

            {/* Title */}
            <h3 className="font-[F3] text-center text-2xl font-semibold mb-2">
               Finish this Ride
            </h3>

            <div className='flex items-center justify-between mb-6 bg-gray-200 rounded-2xl p-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-18 w-18 rounded-full object-cover' src="https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g" alt="" />
                    <h2 className='font-[F1] text-xl'>Utkarsh Sahu</h2>
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
                                Gomti Nagar Lucknow
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
                                Shiv Nagar Khadra Lucknow Shiv Nagar Khadra Lucknow Shiv Nagar
                            </h1>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-center pb-2">
                        <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-money-rupee-circle-fill text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-4 w-full">
                            <h1 className="text-xl font-[F3]">&#8377; 562.30</h1>
                            <p className="text-sm font-[F1] leading-5 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

      <div className="w-full  mt-2">

   <div className='w-full flex flex-col gap-2 items-center justify-center'>
     
  {/* Confirm Button */}
  <Link
    to="/captains/home"
    className="w-3/4 text-center bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 
               transition-all duration-200 px-6 py-2 rounded-full text-lg font-[F2] 
               border border-gray-700 shadow-sm active:scale-95"
  >
    Finish Ride
  </Link >
 <p className="font-[F2]  text-xs mt-1 text-rose-600 font-light text-center">
  Tap <span className="font-[F3]">"Finish Ride"</span> once you’ve received your payment.
</p>


   </div>



</div>


            </div>
        </div>
  )
}

export default FinishRide