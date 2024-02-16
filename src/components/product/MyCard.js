import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap';

export default function MyCard({typeId , selectedLanguage}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log('hello')
        if (selectedLanguage == null) {
            fetch(`http://localhost:8080/api/products/getProductsByType/${typeId}`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
        }else{
            fetch(`http://localhost:8080/api/products/getProductsByTypeandLang/${typeId}/${selectedLanguage}`)
                .then((res) => res.json())
                .then((data) => setProducts(data));
        }
    }, [typeId, selectedLanguage]);
    

    return (
        <Container className='d-flex align-items-center py-5 row row-cols-1 row row-cols-sm-2 row row-cols-md-3' fluid='sm'>
            {
                products.map((product) => (
                    <Card style={{ width: '18rem' }} className='mx-3 my-2'>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{product.product_name}</Card.Title>
                            <Card.Text>{product.product_description_short}</Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>))

            }
        </Container>
  );
}