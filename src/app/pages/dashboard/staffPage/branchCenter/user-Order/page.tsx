"use client"
import { XCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import axios from 'axios';
import myStore from '../../../../../context/store';
import { Provider } from 'react-redux';
// import { useSelector } from 'react-redux';
import UserOrder from './userOrder';

const page = () => {

	// const tableType = useSelector((state: any) => state.dataAdmin.tableType)
	const now = new Date();
    const day = now.getDate(); // returns a number representing the day of the week, starting with 0 for Sunday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const month = now.getMonth()+1;
    const year = now.getFullYear();
    console.log('day', day)

	// console.log('data', tableType)
    const [response, setResponse] = useState('');

    const config = {
		headers: { Authorization: 'Bearer 1e818890-8aea-11ee-b22a-0dc7d55af999' },
	};
	const bodyParameters = {
		colorDark: 'black',
		qrCategory: 'url',
		// text: orderNumber,
	};
	const getQrCode = async () => {
		try {
			const res = await axios.post(
				'https://qrtiger.com/api/qr/static',
				bodyParameters,
				config
			);
			setResponse(res.data.url);
		} catch (err) {
			console.log(err);
		}
	};
  return (
	<Provider store={myStore}>
		<UserOrder orderNumber={''}/>
	</Provider>
							// <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
							// 	<div className=" w-[80vw] h-[80%] py-5 bg-white flex flex-col justify-center items-center">
							// 		<div className=" flex w-full justify-between px-[10%]">
							// 			<div className="flex pb-2 items-center text-2xl font-semibold text-gray-900 dark:text-white">
							// 				<img
							// 					className="w-8 h-8 mr-2 rounded-full"
							// 					src="/image/magic-post-logo.png"
							// 					alt="logo"
							// 				/>
							// 				Magic Post
							// 			</div>
							// 			<div className="bg-white rounded-r-md flex items-center justify-center pb-2">
							// 				{response ? (
							// 					<>
							// 						<div className="w-[40%] pt-5">
							// 							<img
							// 								className=" w-52"
							// 								src={response}
							// 								alt="qrCode"
							// 							/>
							// 						</div>
							// 					</>
							// 				) : (
							// 					<div className="text-gray-500">
							// 						Your QrCode will showing here...
							// 					</div>
							// 				)}
							// 			</div>
							// 		</div>
                            //         {/* //TODO:  */}
							// 		<div className=" w-[90%] border-2 border-black flex">
							// 			<div className=" w-[50%] border-r-2 border-black">
							// 				<div className="border-b-2 border-black p-2">
							// 					<b>1. Họ tên địa chỉ người gửi</b>
							// 					<br />
							// 					{/* <span>
							// 						{dataBranch.sender} <br />
							// 						{dataBranch.senderLocation}
							// 					</span>
							// 					<br />
							// 					<span>
							// 						<b>Điện thoại:</b> {dataBranch.senderPhone}
							// 					</span> */}
							// 					<br />
							// 					<span className=" mr-20">
							// 						<b>Mã mặt hàng:</b>
							// 					</span>
							// 					<span>
							// 						<b>Mã bưu chính:</b> 10179
							// 					</span>
							// 				</div>
							// 				<div className="border-b-2 border-black p-2">
							// 					<span>
							// 						<b>3. Loại hàng gửi:</b>
							// 					</span>
							// 					<br />
							// 					<div className=" flex gap-32">
							// 						{/* <div>
							// 							<input type="checkbox" />
							// 							<label>{dataBranch.orderType}</label>
							// 						</div> */}
							// 					</div>
							// 					<span>
							// 						<b>4. Nội dung trị giá bưu gửi:</b>
							// 					</span>
							// 					<br />
							// 					<table>
							// 						<tr className="border-2 border-gray-500">
							// 							<th className="border-2 border-gray-500 p-1">
							// 								Nội dung
							// 							</th>
							// 							<th className="border-2 border-gray-500 p-1">
							// 								Số lượng
							// 							</th>
							// 							<th className="border-2 border-gray-500 p-1">
							// 								Trị giá
							// 							</th>
							// 							<th className="border-2 border-gray-500 p-1">
							// 								Giấy tờ đính kèm
							// 							</th>
							// 						</tr>
							// 						<tr className="border-2 border-gray-500">
							// 							<td className="border-2 border-gray-500 p-1 text-center">
							// 								Tổng
							// 							</td>
							// 							{/* <td className="border-2 border-gray-500 p-1 text-center">
							// 								{dataBranch.orderQuality}
							// 							</td> */}
							// 							<td className="border-2 border-gray-500 p-1 text-center"></td>
							// 							<td className="border-2 border-gray-500 p-1 text-center"></td>
							// 						</tr>
							// 					</table>
							// 				</div>
							// 				<div className="border-b-2 border-black p-2">
							// 					<b>5. Dịch vụ đặc biệt cộng thêm:</b>
							// 					<br />
							// 					<span className="w-full">
							// 						..........................................................................................
							// 					</span>
							// 					<br />
							// 					<span>Mã hợp đồng EMSC/PPA</span>
							// 				</div>
							// 				<div className="border-b-2 border-black p-2">
							// 					<b>
							// 						6. Chỉ dẫn cho người gửi khi không phát được bưu gửi:
							// 					</b>
							// 					<br />
							// 					<div className=" flex gap-2 flex-wrap">
							// 						<div>
							// 							<input type="checkbox" />
							// 							<label>Chuyển khoản ngay</label>
							// 						</div>
							// 						<div>
							// 							<input type="checkbox" />
							// 							<label>Gọi điện cho người gửi</label>
							// 						</div>
							// 						<div>
							// 							<input type="checkbox" />
							// 							<label>Hủy</label>
							// 						</div>
							// 						<div>
							// 							<input type="checkbox" />
							// 							<label>Chuyển khoản trước</label>
							// 						</div>
							// 						<div>
							// 							<input type="checkbox" />
							// 							<label>
							// 								Chuyển khoản trước khi hết thời gian lưu trữ
							// 							</label>
							// 						</div>
							// 					</div>
							// 				</div>
							// 				<div>
							// 					<b>7. Cam kết của người gửi:</b>
							// 					<br />
							// 					<p>
							// 						Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và
							// 						cam đoan bưu gửi này không chứa những mặt hàng nguy
							// 						hiểm, cấm gửi. Trường hợp không phát hiện được hãy
							// 						thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển
							// 						khoản.
							// 					</p>
							// 					<div className=" flex gap-[30%]">
							// 						<b>8. Ngày giờ gửi:</b>
							// 						<b>Chữ ký người gửi:</b>
							// 					</div>
							// 					<span>07h52-18/10/2023</span>
							// 				</div>
							// 			</div>
							// 			{/* section2 */}
							// 			<div className=" w-[50%]">
							// 				<div className="border-b-2 border-black p-2">
							// 					<b>2. Họ tên địa chỉ người nhận</b>
							// 					<br />
							// 					{/* <span>
							// 						{dataBranch.receiver} <br />
							// 						{dataBranch.receiverLocation}
							// 					</span> */}
							// 					<br />
							// 					<span>
							// 						<b>Mã mặt hàng:</b>
							// 					</span>
							// 					<br />
							// 					{/* <span className=" mr-20">
							// 						<b>Điện thoại:</b> {dataBranch.receiverPhone}
							// 					</span> */}
							// 					<span>
							// 						<b>Mã bưu chính:</b> 01089
							// 					</span>
							// 				</div>
							// 				<div className="border-b-2 border-black flex">
							// 					<div className="border-r-2 border-black w-[50%]">
							// 						<div className="border-b-2 border-black p-2">
							// 							<b>9. Cước</b>
							// 							<div className="w-full flex justify-between">
							// 								<span>a. Cước chính:</span>
							// 								<span> 9.500</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>b. Phụ phí:</span>
							// 								<span> 1.900</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>c. Cước GTGT</span>
							// 								<span> 0</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>d. Tổng cước (gồm VAT)</span>
							// 								<span> 12.312</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>e. Thu khác</span>
							// 								<span> 0</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<b>f. Tổng thu</b>
							// 								<b> 12.312</b>
							// 							</div>
							// 						</div>
							// 						<div className="p-2">
							// 							<b>11. Thu của người nhận:</b>
							// 							<div className="w-full flex justify-between">
							// 								<span>COD:</span>
							// 								<span> 0</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>Thu khác</span>
							// 								<span> 0</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>Tổng thu</span>
							// 								<span> 0</span>
							// 							</div>
							// 						</div>
							// 					</div>
							// 					<div className="w-[50%]">
							// 						<div className="border-b-2 border-black p-2 ">
							// 							<b>10. Khối lượng (kg):</b>
							// 							<div className="w-full flex justify-between">
							// 								<span>Khối lượng thực tế:</span>
							// 								<span> 30</span>
							// 							</div>
							// 							<div className="w-full flex justify-between">
							// 								<span>Khối lượng quy đổi:</span>
							// 								<span> 0</span>
							// 							</div>
							// 						</div>
							// 						<div>
							// 							<b>12. Chú dẫn nghiệp vụ:</b>
							// 							<br />
							// 							<span>1</span>
							// 						</div>
							// 					</div>
							// 				</div>
							// 				<div className=" flex w-full">
							// 					<div className="border-r-2 p-2 border-black w-[50%] h-[30vh] text-center">
							// 						<b>13.Bưu cục chấp nhận</b>
							// 						<br />
							// 						<span>Chữ ký GDV nhận</span>
							// 						<div className="flex justify-center items-center">
							// 							<img
							// 								className=" object-contain"
							// 								src="/image/dấu_ấn_bưu_điện.png"
							// 							/>
							// 						</div>
							// 						<span>GDV:</span>
							// 					</div>
							// 					<div className=" p-2 w-[50%]">
							// 						<b>14. Ngày giờ nhận</b>
							// 						<br />
							// 						<b>{hours}h{minutes}, {day}/{month}/{year}</b>
							// 						<br />
							// 						<span className="text-center w-[90%] flex">
							// 							Người nhận/Người được ủy quyền nhận
							// 						</span>
							// 						<br />
							// 						<span className="px-[22%]">(Ký, ghi rõ họ tên)</span>
							// 					</div>
							// 				</div>
							// 			</div>
							// 		</div>
							// 	</div>
							// </div>
  )
}

export default page