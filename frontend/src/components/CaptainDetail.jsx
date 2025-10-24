import React from 'react'

const CaptainDetail = () => {
  return (
    <div>
        
                <div className='flex  items-center justify-between'>
                    <div className='flex items-center gap-3 justify-start'>
                        <img className='rounded-full h-18 w-18 object-cover' src='https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g' alt="" />
                        <h4 className='font-[F1] text-xl'>Utkarsh Sahu</h4>
                        
                    </div>
                    <div>
                        <h4  className='font-[F2] font-semibold text-xl'>&#8377; 362.25</h4>
                        <p  className='font-[F2] text-sm text-gray-600 '>Earned</p>
                    </div>
                </div>

                <div className='flex p-3 mt-6 bg-gray-200 rounded-xl items-start gap-5 justify-center  '>
                    <div className='text-center '>
                        <i className="text-3xl mb-2  font-[F2] text-extrabold ri-time-line"></i>
                        <h5 className="text-lg font-[F3]" >10.2</h5>
                        <p className='text-sm text-gray-600 font-[F2]'>Hours Online</p>
                    </div>
                    <div className='text-center '>
                        <i className="text-3xl mb-2  font-[F2] text-extrabold ri-speed-up-line"></i>
                        <h5 className="text-lg font-[F3]">30 KM</h5>
                        <p className='text-sm text-gray-600 font-[F2]'>Hours Online</p>
                    </div>
                    <div className='text-center '>
                        <i className="text-3xl mb-2  font-[F2] text-extrabold ri-booklet-line"></i>
                        <h5 className="text-lg font-[F3]">1010</h5>
                        <p className='text-sm text-gray-600 font-[F2]'>Hours Online</p>
                    </div>
                </div>

    </div>
  )
}

export default CaptainDetail