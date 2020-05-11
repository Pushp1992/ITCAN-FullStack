import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import Header from '../header/header';
import Listings from '../../service/listingService';
import { Container, Row, Col, Input, Card, CardImg, CardText, CardBody, CardTitle, Form, FormGroup, Button } from "reactstrap";
// import Button from '../../component/button/button';
import '../cart/cart.css';
import '../listingPage/listingPage.css';

const BASE_URL = "https://res.cloudinary.com/pushpcloud/image/upload/v1588930923/itcan";

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool,
    form: PropTypes.bool
}

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedproduct: [],
            currentProduct: [],
            userAddress: {
                fname: '',
                lname: '',
                flatno: '',
                address: '',
                landmark: '',
                state: '',
                city: '',
                pin: '',
            }
        }
        this.removeProduct = this.removeProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.proceedToPay = this.proceedToPay.bind(this)
    }

    handleChange(event) {
        event.preventDefault()

        this.setState(
            prevState => ({
                userAddress: {
                    ...prevState.userAddress,
                    [name]: value
                }
            })
        )

        const { name, value } = event.currentTarget;
    }

    proceedToPay(event) {
        event.preventDefault()
    }

    removeProduct = (event) => {
        event.preventDefault();
        const productName = event.currentTarget.value;
        var removeIndex = this.state.selectedproduct.map(function (item) { return item.name; }).indexOf(productName);
        this.state.selectedproduct.splice(removeIndex, 1);
        this.setState({ ...this.state.selectedproduct })
    }
    componentDidMount() {
        let finalProduct = this.props.location.state.productReadyForCheckout;
        let productListnames = [];
        finalProduct.forEach((element, index) => {
            productListnames.push(element.selectedProductName)
            let productInfo = Listings.listItem.filter(item => productListnames.includes(item.name))
            let newProdObject = Object.assign({}, ...productInfo)
            newProdObject.actualQty = element.selectedProductQty;
            this.state.currentProduct.push(newProdObject);
            this.setState({ selectedproduct: this.state.currentProduct })

        })
    }
    render() {
        return (
            <React.Fragment>
                <Header id="header" />
                <br />
                {
                    this.state.selectedproduct.length === 0 ?
                        <div id="emptyCart">
                            <i className="fa fa-3x fa-frown-o" aria-hidden="true"></i> <br />
                            <h3>Your Cart looks Empty. Please try addign some items</h3>
                            <div>
                                <Link to="/">
                                    <Badge color="dark">Go to Shopping Page</Badge>
                                </Link>
                            </div>
                        </div>
                        :
                        <Container fluid={true}>
                            <form>
                                <Row noGutters={true}>
                                    <Col md={{ size: 8 }}>
                                        <Row noGutters={false}>
                                            {
                                                this.state.selectedproduct.map(itemData => {
                                                    return (
                                                        <Col key={itemData.length} md={{ size: 3 }}>

                                                            <Card>
                                                                <CardImg top width="100%" src={`${BASE_URL}/${itemData.image}`} />
                                                                <CardBody>
                                                                    <CardTitle id="cardName">{itemData.name}</CardTitle>
                                                                    <CardText id="cardDesc">{itemData.description}</CardText>
                                                                    <CardText>
                                                                        <Row className="cardInfo">
                                                                            <Col md={{ size: 4 }} id="cardPrice">{itemData.price}</Col>
                                                                            <Col md={{ size: 6 }} id="qtyDisplay">Select Quantity:
                                                                     <Input type="select" name={itemData.name} value={this.state.selectedQty} id="cardQty">
                                                                                    {
                                                                                        itemData.qty.map(data => { return (<option key={data} value={data}> {data}</option>) })
                                                                                    }
                                                                                </Input>
                                                                            </Col>
                                                                        </Row>
                                                                    </CardText>
                                                                </CardBody>
                                                                <Button name="submit" type="submit" color="warning" value={itemData.name} onClick={this.removeProduct}>
                                                                    <i className="fa fa-trash" aria-hidden="true"></i> Remove From cart
                                                                </Button>
                                                            </Card> <br />

                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Col>
                                    <Col md={{ size: 3, offset: 1 }}>
                                        <Card body outline color="success">
                                            <CardTitle>Address and Billing Details</CardTitle>
                                            <CardText>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="text" name='fname' value={this.state.userAddress.fname} plaintext placeholder='First Name' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="text" name='lname' value={this.state.userAddress.lname} plaintext placeholder='Last Name' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="number" name='flatno' value={this.state.userAddress.flatno} plaintext placeholder='Flat no.' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="text" name='landmark' value={this.state.userAddress.landmark} plaintext placeholder='Landmark' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Input type="text" name='address' value={this.state.userAddress.address} plaintext placeholder='Enter address' onChange={this.handleChange} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="text" name='city' value={this.state.userAddress.city} plaintext placeholder='City' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Input type="text" name='state' value={this.state.userAddress.state} plaintext placeholder='State' onChange={this.handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </CardText>
                                            <Button name="payment" color="success" onClick={this.proceedToPay}>Proceed to Pay</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                }

            </React.Fragment>
        )
    }
}

export default CartPage;