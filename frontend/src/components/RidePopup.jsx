import React from 'react'

const RidePopup = (props) => {
    // console.log(props)
    return (
        <div>
            {/* Close / Down Arrow */}
            <h5
                onClick={() => props.setRidePopupPanel(false)}
                className="absolute top-1 left-1/2 -translate-x-1/2 text-gray-800 p-2 cursor-pointer"
            >
                <i className="ri-arrow-down-wide-fill text-2xl  font-semibold"></i>
            </h5>

            {/* Title */}
            <h3 className="font-[F3] text-2xl font-semibold   mb-2">
                A new ride is waiting for you!
            </h3>
            <div className='flex  items-center justify-between mb-6  bg-gray-200 rounded-2xl p-2'>
                <div className='flex items-center   gap-3  '>
                    <img className='h-18 w-18 rounded-full object-cover' src="https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g" alt="" />
                    <h2 className='font-[F1] text-xl' >{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname }</h2>
                </div>
                <h5 className='font-[F3] font-semibold text-lg text-gray-600 '>2.2KM</h5>

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

                {/* Confirm Button */}

              <div className="flex items-center justify-around gap-10 mt-6 w-full">
  <button
    onClick={() =>{ props.setConfirmRidePopupPanel(true)
        props.confirmRide()
    }}
    className="bg-gray-500 text-white px-8 py-2 rounded-3xl text-lg font-[F2] border border-gray-800 shadow-sm
               hover:bg-gray-700 active:scale-95 transform transition duration-150 ease-out"
  >
    Accept
  </button>

  <button
    onClick={() => props.setRidePopupPanel(false)}
    className="bg-rose-100 text-rose-600 px-8 py-2 rounded-3xl text-lg font-[F2] border border-rose-300 shadow-sm
               hover:bg-rose-200 active:scale-95 transform transition duration-150 ease-out"
  >
    Ignore
  </button>
</div>


            </div>
        </div>
    )
}

export default RidePopup