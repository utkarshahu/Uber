import React from 'react'
import { Link } from 'react-router-dom'

const CaptainHome = () => {
    return (
        <div className='h-screen'>

            <div className='flex items-center justify-between p-6 top-0 fixed h-14 w-screen '>
                <img className='w-20 z-2' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" alt="" />
                <Link to='/home' className='  fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className=" text-2xl font-medium ri-logout-box-r-line "></i>
                </Link>
            </div>

            <div className='h-3/5 '>
                <img className=" w-full h-full object-cover"
                    src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
                    alt="map" />
            </div>



            <div className='h-2/5  p-4'>

                <div className='flex  items-center justify-between'>
                    <div className='flex items-center gap-3 justify-start'>
                        <img className='rounded-full h-18 object-cover' src="https://media.licdn.com/dms/image/v2/D4D03AQEYAzaePKxZjA/profile-displayphoto-shrink_800_800/B4DZR98XouGkAg-/0/1737279765620?e=1762992000&v=beta&t=Wke_6U7z0zoYwwQUB5LyPGdilFbJIHkpksR67cr64So" alt="" />
                        <h4 className='font-[F1] text-xl'>Utkarsh Sahu</h4>
                        
                    </div>
                    <div>
                        <h4  className='font-[F2] font-semibold text-xl'>&#8377; 362.25</h4>
                        <p  className='font-[F2] text-sm text-gray-600 '>Earned</p>
                    </div>
                </div>

                <div className='flex p-3 mt-6 bg-gray-300 rounded-xl items-start gap-5 justify-center  '>
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


        </div>
    )
}

export default CaptainHome