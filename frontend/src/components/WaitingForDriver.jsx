import React from 'react'

const WaitingForDriver = (props) => {
  return (
     <div>
      {/* Close / Down Arrow */}
      <h5
        onClick={() => props.WaitingForDriver(false)}
        className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-800 p-2 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-fill text-2xl font-semibold"></i>
      </h5>
      <div className='flex items-center justify-between '>
         {/* Ride Image */}
        <img
          className="h-12 object-contain mb-6"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt="Uber Go"
        />
        <div className='text-right'>
          <h2 className='font-[F3] font-bold text-lg '>Utkarsh Sahu</h2>
          <h4 className='font-[F2] font-semibold -mt-1 -mb-1 text-xl text-gray-600 '>UP32 JN 2007</h4>
          <p className='font-[F2] text-base text-gray-600'>Mastang Model M6</p>
        </div>
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

        {/* Confirm Button */}
       
          
      
      </div>
    </div>
  )
}

export default WaitingForDriver