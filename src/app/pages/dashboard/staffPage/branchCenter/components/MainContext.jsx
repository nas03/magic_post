'use client'
import React, {useEffect, useState} from 'react'
import { ArrowUpIcon, MapPinIcon, XCircleIcon } from '@heroicons/react/24/solid'
import DateTimePickerValue from './DateTime'
import DataTable from './DataTable'
import { useSelector, useDispatch } from 'react-redux'
import { updateOrderList, clearOrderName, clearOrderType } from '../../../../../context/actions/updateOrderList'
import axios from 'axios';

function MainContext() {
    const dispatch = useDispatch()
    const tableType = useSelector((state) => state.tableData.tableData)
    const orderNameList = useSelector((state) => state.orderList.nameList)
    const orderTypeList = useSelector((state) => state.orderList.typeList)
    const orderList = useSelector((state) => state.orderList.orderList)
    const [showModal, setShowModal] = useState(false)
    const [showModalCf, setShowModalCf] = useState(false)
    const [showModalBill, setShowModalBill] = useState(false)
    const [response, setResponse] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    if(orderList[1] != null) {

        console.log("name list", orderList[orderList.length - 1].col2)
    }

    const confirmHandle = () => {
        dispatch(clearOrderName(''))
        dispatch(clearOrderType(''))
        setShowModalCf(false)
    }

    const createOrderHandle = () => {
        dispatch(clearOrderName(''))
        dispatch(clearOrderType(''))
        setShowModal(false)
    }

    const closeBillHandle = () => {
        dispatch(clearOrderName(''))
        dispatch(clearOrderType(''))
        setShowModalBill(false)
        console.log('qr', orderNameList )
    }

    const openBillHandle = () => {
        setOrderNumber(orderNameList)
        getQrCode()
        setShowModalBill(true)
        console.log('response', response)
    }

    
    const config = {
		headers: { Authorization: 'Bearer 1e818890-8aea-11ee-b22a-0dc7d55af999' },
	};
	const bodyParameters = {
		colorDark: 'black',
		qrCategory: 'url',
		text: orderNumber,
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
			console.log(err)
		}
	};
    
    return (
    <div className=' w-full h-full p-[2%]'>
        {
            tableType == 'Gathering Point'
            ?
                <div className=' w-full h-[30%] flex flex-col gap-[5%]'>
                    <div className=' w-full h-[20%] gap-[1%] flex items-center'>
                        <span className=' text-3xl font-bold'>Hi, Magic Post</span>
                        <img src="/image/goodbye.png" className=' w-[3%] h-full' alt="" />
                    </div>
                    <div className=' h-[55%] w-full flex justify-center'>
                            <div className=' w-[30%] rounded-l-lg bg-[#FBE2DE] flex gap-[5%] justify-center items-center'>
                                <img src="/image/onGoing.jpg" className='w-[25%] h-[80%] rounded-xl object-fill' alt="" />
                                <div className='flex flex-col justify-between py-[5%] h-[80%]'>
                                    <span className=' font-semibold text-[#54555E]'>Return Transaction Point</span>
                                    <div className=' flex justify-between items-end gap-[30%] w-[80%]'>
                                        <span className=' text-xl font-bold text-[#0F0D16]'>259</span>
                                        <div className=' text-red-500 flex'>
                                            <ArrowUpIcon className=' w-4 h-4 '/>
                                            <span className=' text-sm'>12.4%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-[30%] border-x-2 border-white bg-[#E5D6EB] flex gap-[5%] justify-center items-center'>
                                <img src="/image/shiped.jpg" className='w-[25%] h-[80%] rounded-xl object-fill' alt="" />
                                <div className='flex flex-col justify-between py-[5%] h-[80%]'>
                                    <span className=' font-semibold text-[#54555E]'>Unsuccessful Shipping</span>
                                    <div className=' flex justify-between items-end gap-[30%] w-[80%]'>
                                        <span className=' text-xl font-bold text-[#0F0D16]'>320</span>
                                        <div className=' text-violet-500 flex'>
                                            <ArrowUpIcon className=' w-4 h-4 '/>
                                            <span className=' text-sm'>10.4%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-[30%] rounded-r-lg bg-[#C9E9E4] flex gap-[5%] justify-center items-center'>
                                <img src="/image/completed.jpg" className='w-[25%] h-[80%] rounded-xl object-fill' alt="" />
                                <div className='flex flex-col justify-between py-[5%] h-[80%]'>
                                    <span className=' font-semibold text-[#54555E]'>Successful Shipping</span>
                                    <div className=' flex justify-between items-end gap-[30%] w-[80%]'>
                                        <span className=' text-xl font-bold text-[#0F0D16]'>1,327</span>
                                        <div className=' text-[#4D7B7B] flex'>
                                            <ArrowUpIcon className=' w-4 h-4 '/>
                                            <span className=' text-sm'>2.4%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            :
                ''
        }
        <div className=' w-full h-[65%] flex flex-col gap-[5%]'>
            <div className=' w-full justify-between flex items-center'>
                <span className=' text-[#54555E] font-semibold'>Shipping Reports</span>
                 <DateTimePickerValue/>
            </div>
            <DataTable/>
        </div>
        {
            tableType == 'Create Orders'
            ?
            <div className=' w-full flex justify-end items-center h-[10%]'>
                <button onClick={() => setShowModal(true)} className=' rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]'>Create Orders</button>
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className=' w-[40vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative'>
                                    <XCircleIcon onClick={() => setShowModal(false)} color='red' className=' z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer'/>
                                    <div className="flex items-center py-5 text-2xl font-semibold text-gray-900 dark:text-white">
                                        <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                        Magic Post    
                                    </div>
                                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Create Shipping Order
                                            </h1>
                                            <form className="space-y-4 md:space-y-6" action="#">
                                                <div>
                                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Name</label>
                                                    <span id="Order Name" placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{orderNameList}</span>
                                                </div>
                                                <div>
                                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Type</label>
                                                    <span id="Order Name" placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{orderTypeList}</span>
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Come From</label>
                                                    <span id="come from"  placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " ></span>
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roads to goal</label>
                                                    <div className=' w-full h-[5vw] flex justify-between'>
                                                        {
                                                                <div className=' w-full, h-[60%]'>
                                                                    <MapPinIcon className=' w-3 h-3 object-contain'/>
                                                                    <span className=' text-black'>{orderList[0].col2}</span>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <button type="submit" onClick={() => createOrderHandle()} className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm Orders Received</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
            </div>
             :
             <div className=' w-full flex justify-end items-center gap-2 h-[10%]'>
                <button onClick={() => setShowModalCf(true)} className=' rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]'>Confirm Orders Received</button>
                <button onClick={() => openBillHandle()} className=' rounded-md p-2 bg-[#4C9E9C] py-2 text-xs cursor-pointer text-white hover:bg-transparent hover:border-2 hover:border-[#4C9E9C] hover:text-[#4C9E9C]'>Create User Orders</button>
                {showModalCf ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className=' w-[40vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative'>
                                    <XCircleIcon onClick={() => setShowModalCf(false)} color='red' className=' z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer'/>
                                    <div className="flex items-center py-5 text-2xl font-semibold text-gray-900 dark:text-white">
                                        <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                        Magic Post    
                                    </div>
                                    <div className="w-full bg-yellow-100 rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-800">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Confirm Orders Received
                                            </h1>
                                            <form className="space-y-4 md:space-y-6" action="#">
                                                <div>
                                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Name</label>
                                                    <span id="Order Name" placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{orderNameList}</span>
                                                </div>
                                                <div>
                                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Type</label>
                                                    <span id="Order Name" placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{orderTypeList}</span>
                                                </div>
                                                <div>
                                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quality</label>
                                                    <span id="quality"  placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></span>
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Come From</label>
                                                    <span id="come from"  placeholder='Empty' className="bg-gray-50 py-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " ></span>
                                                </div>
                                                <button type="submit" onClick={() => confirmHandle()} className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm Orders Received</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {showModalBill ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className=' w-[80vw] py-5 bg-white border-2 border-black rounded-md flex flex-col justify-center items-center'>
                                <div className=' flex w-full justify-between px-[10%] pt-[8%]'>
                                    <div className="flex pb-2 items-center text-2xl font-semibold text-gray-900 dark:text-white">
                                        <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                        Magic Post    
                                    </div>
                                    <div className="bg-white rounded-r-md flex items-center justify-center pb-2">
                                        {response ? (
                                            <>
                                                <div className='w-[40%] pt-5'>
                                                    <img className=' w-52' src={response} alt="qrCode" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500">Your QrCode will showing here...</div>
                                        )}
                                            <XCircleIcon onClick={() => closeBillHandle()} color='red' className=' z-50 w-5 h-5 object-contain translate-x-[10vw] -translate-y-5 cursor-pointer'/>
                                     </div>
                                </div>
                                <div className=' w-[90%] border-2 border-black flex'>
                                    <div className=' w-[50%] border-r-2 border-black'>
                                        <div className='border-b-2 border-black p-2'>
                                            <b>1. Họ tên địa chỉ người gửi</b><br/>
                                            <span>Hoàng Minh Thắng <br/>Dịch Vọng Hậu, Cầu Giấy, Hà Nội</span><br/>
                                            <span><b>Điện thoại:</b> 03828877865</span><br/>
                                            <span className=' mr-20'><b>Mã mặt hàng:</b></span>
                                            <span><b>Mã bưu chính:</b> 10179</span>
                                        </div>
                                        <div className='border-b-2 border-black p-2'>
                                            <span><b>3. Loại hàng gửi:</b></span><br/>
                                            <div className=' flex gap-32'>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Tài liệu</label>
                                                </div>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Hàng hóa</label>
                                                </div>
                                            </div>
                                            <span><b>4. Nội dung trị giá bưu gửi:</b></span><br/>
                                            <table>
                                                <tr className='border-2 border-gray-500'>
                                                    <th  className='border-2 border-gray-500 p-1'>Nội dung</th>
                                                    <th  className='border-2 border-gray-500 p-1'>Số lượng</th>
                                                    <th  className='border-2 border-gray-500 p-1'>Trị giá</th>
                                                    <th  className='border-2 border-gray-500 p-1'>Giấy tờ đính kèm</th>
                                                </tr>
                                                <tr className='border-2 border-gray-500'>
                                                    <td  className='border-2 border-gray-500 p-1 text-center'>Tổng</td>
                                                    <td  className='border-2 border-gray-500 p-1 text-center'>0</td>
                                                    <td  className='border-2 border-gray-500 p-1 text-center'></td>
                                                    <td  className='border-2 border-gray-500 p-1 text-center'></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='border-b-2 border-black p-2'>
                                            <b>5. Dịch vụ đặc biệt cộng thêm:</b><br/>
                                            <span className='w-full'>..........................................................................................</span><br/>
                                            <span>Mã hợp đồng EMSC/PPA</span>
                                        </div>
                                        <div className='border-b-2 border-black p-2'>
                                            <b>6. Chỉ dẫn cho người gửi khi không phát được bưu gửi:</b><br/>
                                            <div className=' flex gap-2 flex-wrap'>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Chuyển khoản ngay</label>
                                                </div>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Gọi điện cho người gửi</label>
                                                </div>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Hủy</label>
                                                </div>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Chuyển khoản trước</label>
                                                </div>
                                                <div>
                                                    <input type='checkbox'/>
                                                    <label>Chuyển khoản trước khi hết thời gian lưu trữ</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                                <b>7. Cam kết của người gửi:</b><br/>
                                                <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát hiện được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển khoản.</p>
                                                <div className=' flex gap-[30%]'>
                                                    <b>8. Ngày giờ gửi:</b>
                                                    <b>Chữ ký người gửi:</b>
                                                </div>
                                                <span>07h52-18/10/2023</span>
                                        </div>
                                    </div>
                                    {/* section2 */}
                                    <div className=' w-[50%]'>
                                        <div className='border-b-2 border-black p-2'>
                                                <b>2. Họ tên địa chỉ người nhận</b><br/>
                                                <span>Lưu Văn Đức Thiệu <br/>Dịch Vọng Hậu, Cầu Giấy, Hà Nội</span><br/>
                                                <span><b>Mã mặt hàng:</b></span><br/>
                                                <span className=' mr-20'><b>Điện thoại:</b> 03892738448</span>
                                                <span><b>Mã bưu chính:</b> 01089</span>
                                        </div>
                                        <div className='border-b-2 border-black flex'>
                                            <div className='border-r-2 border-black w-[50%]'>
                                                <div className='border-b-2 border-black p-2'>
                                                    <b>9. Cước</b>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>a. Cước chính:</span>
                                                        <span> 9.500</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>b. Phụ phí:</span>
                                                        <span> 1.900</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>c. Cước GTGT</span>
                                                        <span> 0</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>d. Tổng cước (gồm VAT)</span>
                                                        <span> 12.312</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>e. Thu khác</span>
                                                        <span> 0</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <b>f. Tổng thu</b>
                                                        <b> 12.312</b>
                                                    </div>
                                                </div>
                                                <div className='p-2'>
                                                    <b>11. Thu của người nhận:</b>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>COD:</span>
                                                        <span> 0</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>Thu khác</span>
                                                        <span> 0</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>Tổng thu</span>
                                                        <span> 0</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-[50%]'>
                                                <div className='border-b-2 border-black p-2 '>
                                                    <b>10. Khối lượng (kg):</b>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>Khối lượng thực tế:</span>
                                                        <span> 30</span>
                                                    </div>
                                                    <div className= 'w-full flex justify-between' >
                                                        <span>Khối lượng quy đổi:</span>
                                                        <span> 0</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <b>12. Chú dẫn nghiệp vụ:</b><br/>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' flex w-full'>
                                            <div className='border-r-2 p-2 border-black w-[50%] h-[30vh] text-center'>
                                                <b>13.Bưu cục chấp nhận</b><br/>
                                                <span>Chữ ký GDV nhận</span>
                                                <div className='flex justify-center items-center'>
                                                    <img className=' object-contain' src='/image/dấu_ấn_bưu_điện.png' />
                                                </div>
                                                <span>GDV:</span>
                                            </div>
                                            <div className=' p-2 w-[50%]'>
                                                <b>14. Ngày giờ nhận</b><br/>
                                                <b>...h.../.../.../20...</b><br/>
                                                <span className='text-center w-[90%] flex'>Người nhận/Người được ủy quyền nhận</span><br/>
                                                <span className='px-[22%]'>(Ký, ghi rõ họ tên)</span>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
            </div>
        } 
    </div>
  )
}

export default MainContext