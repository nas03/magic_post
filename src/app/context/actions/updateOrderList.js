export const updateOrderList = (orderTag) => ({
    type: 'UPDATEORDERLIST',
    order: orderTag 
})

export const updateOrderName = (name) => ({
    type: 'UPDATEORDERNAME',
    orderName: name
}
)

export const updateOrderType = (type) => ({
    type: 'UPDATEORDERTYPE',
    orderType: type
})

export const clearOrderName = (name) => ({
    type: 'CLEARORDERNAME',
    orderName: name
}
)

export const clearOrderType = (type) => ({
    type: 'CLEARORDERTYPE',
    orderType: type
})
