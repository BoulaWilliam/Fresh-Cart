import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import Card from '../../Components/Card/Card';

export default function Products() {

    const [product, setProduct] = useState(null)
    async function getProducts() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProduct(data?.data)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            {!product ? <Loading /> : <div className="grid sm:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                {product.map((product) => <Card productInfo={product} key={product.id} />)}
            </div>}
        </>
    )
}
