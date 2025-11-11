import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => {
          props.setVehiclePanel(false)
        }} className='p-1 text-center absolute   top-0 w-[93%]'><i className="text-2xl font-semibold text-gray-800 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='font-[F3] px-2 mb-4 mt-1 text-2xl font-semibold'>Choose a vehicle</h3>

        <div onClick={()=>{
            props.setconfirmRidePanel(true)
            props.selectVehicle('auto')
        }} className="flex bg-white w-full justify-between rounded-xl mb-2 active:border-black  border-2 border-gray-50 p-2 gap-4">
          {/* Ride Image */}
          <img
            className="h-16 self-center w-24 object-contain "
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
            alt="Uber Go"
          />

          {/* Ride Info */}
          <div className="flex flex-col flex-1 px-3">
            <div className="flex items-center gap-2">
              <span className=" font-[F3] text-lg">Auto</span>
              <span className="flex items-center text-base"><i className="ri-user-3-fill ml-1 mr-1"></i>3</span>
            </div>
            <div className="flex gap-2 text-sm font-medium text-gray-600">
              <span>2 mins away</span>

            </div>
            <p className="text-sm text-gray-500 font-normal mt-1">Affordable, compact rides</p>

          </div>
          {/* Price */}
          <h2 className="text-xl font-semibold bg-white flex items-top pr-4  ">
            <span className="mr-1">&#8377;</span>{props.fare?.fares?.auto || 'N/A'}
          </h2>


        </div>
        <div 
        onClick={()=>{
            props.setconfirmRidePanel(true)
            props.selectVehicle('bike')
        }}
        className="flex bg-white w-full justify-between rounded-xl mb-2 border-2 active:border-black border-gray-50 p-2 gap-4">
          {/* Ride Image */}
          <img
            className="h-16 self-center w-24 object-contain "
            src="https://img.autocarpro.in/autocarpro/4d3ef0c9-c75e-46a3-af25-fab216e0bfe8_Untitled.jpg"
            alt="Uber Go"
          />

          {/* Ride Info */}
          <div className="flex flex-col flex-1 px-3">
            <div className="flex items-center gap-2">
              <span className=" font-[F3] text-lg">Moto</span>
              <span className="flex items-center text-base"><i className="ri-user-3-fill ml-1 mr-1"></i>2</span>
            </div>
            <div className="flex gap-2 text-sm font-medium text-gray-600">
              <span>2 mins away</span>

            </div>
            <p className="text-sm text-gray-500 font-normal mt-1">Affordable, compact rides</p>

          </div>
          {/* Price */}
          <h2 className="text-xl font-semibold bg-white flex items-top pr-4  ">
            <span className="mr-1">&#8377;</span>{props.fare?.fares?.bike || 'N/A'} 
          </h2>


        </div>
        <div 
        onClick={()=>{
            props.setconfirmRidePanel(true)
            props.selectVehicle('car')
        }}
        className="flex bg-white w-full justify-between rounded-xl mb-2 border-2 active:border-black border-gray-50 p-2 gap-4">
          {/* Ride Image */}
          <img
            className="h-16 self-center w-24 object-contain "
            src="https://www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select-768x431.jpeg"
            alt="Uber Go"
          />

          {/* Ride Info */}
          <div className="flex flex-col flex-1 px-3">
            <div className="flex items-center gap-2">
              <span className=" font-[F3] text-lg">Car</span>
              <span className="flex items-center text-base"><i className="ri-user-3-fill ml-1 mr-1"></i>4</span>
            </div>
            <div className="flex gap-2 text-sm font-medium text-gray-600">
              <span>2 mins away</span>

            </div>
            <p className="text-sm text-gray-500 font-normal mt-1">Affordable, compact rides</p>

          </div>
          {/* Price */}
          <h2 className="text-xl font-semibold bg-white flex items-top pr-4  ">
            <span className="mr-1">&#8377;</span>{props.fare?.fares?.car || 'N/A'}
          </h2>
        </div>


    
    </div>
  )
}

export default VehiclePanel