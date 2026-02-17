import React from 'react'
import { useParams } from 'react-router'

const Detail = () => {

    const params=useParams();
    console.log(params);
    
  return (
    <div>Detail</div>
  )
}

export default Detail