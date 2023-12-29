import React from 'react'
import { Button} from "@nextui-org/react";
import Link from 'next/link'

function CustomButton({orderNumber}) {
  return (
    <Link href={`/pages/detailOrder/${orderNumber}`}>
        <Button color="primary">
            Continue
        </Button>
    </Link>
  )
}

export default CustomButton