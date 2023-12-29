import React from 'react'
import CreateUserOrder from './CreateUserOrder'
import UpdateOrderState from './UpdateOrderState'
import CreateShipmentOrder from './CreateShipmentOrder'

const SwitchButton = ({tableType}) => {
    switch(tableType) {
        case  'Branch Center':
          return <CreateUserOrder/>
        case 'Update Package State':
          return <UpdateOrderState/>
        case 'Create Shipment Order':
          return <CreateShipmentOrder/>
        default:
          return null
      }
}

export default SwitchButton