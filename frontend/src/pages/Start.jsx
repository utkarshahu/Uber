import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
    return (
        <div>
            <div className="h-screen bg-[url(https://i.pinimg.com/originals/90/e4/de/90e4de70481d4f9771b464c3527aaede.gif)] bg-cover bg-center bg-no-repeat  pt-8 bg-gray-700 flex justify-between flex-col w-full">
                <img className="w-20 ml-6 " src="https://companieslogo.com/img/orig/UBER.D-f23d4b1c.png?t=1635007057" alt="Uber" />
                <div className="bg-white pb-7 p-4 ">
                    <h1 className='text-black  font-[F3] text-3xl  '>Started with Uber</h1>
                    <Link to="/users/login"  className=" flex justify-center items-center w-full bg-black rounded-full font-[F3] text-white py-3 mt-5 text-xl ">Continue as User Login</Link >
                </div>
            </div>
        </div>
    );
};

export default Start;