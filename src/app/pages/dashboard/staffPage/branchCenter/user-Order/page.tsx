"use client"
import { XCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import axios from 'axios';
import myStore from '../../../../../context/store';
import { Provider } from 'react-redux';
import UserOrder  from '../components/UserOrder';

const page = () => {

	
  return (
	<Provider store={myStore}>
		<UserOrder orderNumber={'12891'}/>
	</Provider>
  )
}

export default page