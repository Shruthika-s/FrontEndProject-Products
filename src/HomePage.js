import React, { useState, useEffect } from 'react';
import { Card,Row, FormControl } from 'react-bootstrap';
import { Modal, ModalTitle, ModalHeader, ModalBody,ModalFooter} from 'react-bootstrap';
import {Col, Image} from 'react-bootstrap';


function HomePage() {
  
    let [products, setProducts] = useState([]);
    let [product, setProduct] = useState([]);
    let [searchTerm, setSearchTerm] = useState('');
    let [id, setid] = useState('');


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

      fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);


  

  let filteredProducts = products.filter((pro) =>
    pro.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //Modal
    let [show,Setshow] = useState(false);

  return (
    <div className="px-5">
        <h1 className='fw-bold text-center mt-4 bg-secondary rounded'>PRODUCTS FOR SALE</h1>
        <h4 className='pt-3'>Search for products</h4>
        <FormControl
            type="text"
            placeholder="Enter product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        className="my-2 border border-secondary"/>
        <Row xs={1} md={2} lg={4} className="g-4">

            {
                filteredProducts.map((pro) => (
                <Col key={pro.id}>
                    <Card style={{width:"22rem", height:"30rem"}} className='p-5' onClick={()=>{
                        Setshow(true)
                        setid(pro.id)
                        // getProduct()
                        }}>
                    <Card.Img variant="top" src={pro.image} alt={pro.title} style={{width:"15rem", height:"15rem"}}/>
                    <Card.Body>
                        <Card.Title className='pt-3'>{pro.title}</Card.Title>
                        <Card.Text className='pt-3 fw-bold'>${pro.price}</Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                ))
                
            }
        </Row>
         
        <Modal 
            show={show}
            // onHide={closeModal}
            backdrop="static"
            centered
            // style={{position:'absolute',left:'-2%'}}
            className='modal-lg'
            >
            <ModalHeader>
                <ModalTitle>Product Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="container">
                    <div className='row'>
                        <div className='col-auto'>
                            <Image src={product.image} alt={product.title} fluid style={{width:"15rem", height:"15rem"}} />
                        </div>
                        <div className='col'>
                            <Card  className='border border-secondary'>
                                <Card.Body>
                                    <Card.Title>Title: {product.title}</Card.Title>
                                    <Card.Text><strong>Price:</strong> <span className='fw-bold bg-warning p-1 rounded'>${product.price}</span></Card.Text>
                                    <Card.Text><strong>Description: </strong>{product.description}</Card.Text>
                                    {/* <Card.Text><strong>Rating:</strong> {product.rating["rate"]}</Card.Text>
                                    <Card.Text><strong>Review Count:</strong> {product.rating["count"]}</Card.Text> */}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger mb-3' onClick={()=>{Setshow(false)
                setProduct([])
                }}>Close</button>
            </ModalFooter>
        </Modal>
  
      
      </div>
  );
};

export default HomePage;