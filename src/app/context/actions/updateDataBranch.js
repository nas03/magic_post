export const updateSenderBranch = (name) => ({
    type: 'UPDATESENDERBRANCH',
    Name: name
}
)

export const updateSenderLocation = (location) => ({
    type: 'UPDATESENDERLOCATION',
    Location: location
})

export const updateSenderPhone = (phone) => ({
    type: 'UPDATESENDERPHONE',
    Phone: phone
})

export const updateReceiverBranch = (name) => ({
    type: 'UPDATERECEIVERBRANCH',
    Name: name
})


export const updateReceiverLocation = (location) => ({
    type: 'UPDATERECEIVERLOCATION',
    Location: location
})


export const updateReceiverPhone = (phone) => ({
    type: 'UPDATERECEIVERPHONE',
    Phone: phone
})

export const updateOrderType = (type) => ({
    type: 'UPDATEORDERTYPE',
    Type: type
})

export const updateCustomInstruction = (instruction) => ({
    type: 'UPDATECUSTOMINSTRUCTION',
    Instruction: instruction
})
