// import React from 'react'

// function QRCode() {

//     // const generateQRCode = (url) => {
//     //     const qrcode = new QRCode("qrcode", {
//     //       text: url,
//     //       width: 100,
//     //       height: 100,
//     //     });
//     //     return qrcode
//     //   };

//     //   console.log('qr', generateQRCode('https://nextui.org/docs/components/modal'))
//   return (
//     <div>QRCode</div>
//   ) 
// }

// export default QRCode



import { useContext } from "react";
import { InputContext } from "./Header";

const QrCode = () => {
  const { response, loading, error } = useContext(InputContext);

  if(loading) {
    return (
      <div className="animate-pulse flex flex-col items-center justify-center px-10 gap-3">
        <div className="h-32 w-full bg-gray-300"></div>
        <div className="h-8 w-full bg-gray-300"></div>
      </div>
    );
  }

  if(error) {
    return <div className="text-gray-500 flex items-center">Sorry, Something went wrong 😥</div>
  }

  return (
    <div className="bg-gray-100 rounded-r-md flex flex-col items-center justify-center py-4">
      {response ? (
        <div>
          <img className=" w-52" src={response} alt="qrCode" />
        </div>
      ) : (
        <div className="text-gray-500">Your QrCode will showing here...</div>
      )}

    </div>
  )
}

export default QrCode