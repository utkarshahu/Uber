import React from 'react';

const locations = [
  "101 MG Road, Bengaluru, Karnataka 560001, India",
  "202 Connaught Place, New Delhi 110001, India",
  "303 Anna Salai, Chennai, Tamil Nadu 600002, India",
  "404 Park Street, Kolkata, West Bengal 700016, India",
  "505 Banjara Hills, Hyderabad, Telangana 500034, India",
  "606 Koregaon Park, Pune, Maharashtra 411001, India",
  "707 Sector 17, Chandigarh 160017, India",
  "808 Hazratganj, Lucknow, Uttar Pradesh 226001, India",
  "909 MI Road, Jaipur, Rajasthan 302001, India",
  "1001 Marine Drive, Mumbai, Maharashtra 400020, India"
];

const LocationSearchPanel = (props) => {
  
  return (
    <div>
      {locations.map(function (elem, index) {
        return (
          <div 
            key={index} 
            onClick={() => {
            props.setVehiclePanel(true),
            props.setopenPanel(false)
          }}
            className="flex gap-4 items-center border-2 p-3 my-2 rounded-2xl border-gray-50 active:border-black justify-start"
          >
            <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-map-pin-2-fill text-xl"></i>
            </div>
            <h4 className="font-[F1] flex-1">
              {elem}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel ;
