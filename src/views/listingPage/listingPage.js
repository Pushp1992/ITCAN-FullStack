import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Listings from '../../service/listingService';
import { Container, Row, Col, Label, Input, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
// custom import 
import '../listingPage/listingPage.css';
import Header from '../header/header';
import Button from '../../component/button/button';
import CustomToastr from '../../service/CustomToastr';

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool,
    form: PropTypes.bool
}

const BASE_URL = "https://res.cloudinary.com/pushpcloud/image/upload/v1588930923/itcan"

class ListingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listingData: [],
            currentlyDisplayedData: [],
            selectedProductList: [],
            productReadyForCart: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.checkout = this.checkout.bind(this)
        window.childComp = this;
    }
    handleChange = (event) => {
        event.preventDefault()
        var { name, value } = event.currentTarget;

        let selectedProduct = {
            selectedProductName: name,
            selectedProductQty: value
        }
        this.state.selectedProductList.push(selectedProduct);
        let newState = { ...this.state };
        newState.productList = this.state.selectedProductList;

        this.setState({ ...newState });
        this.setState({ [name]: value });
        CustomToastr.success(` ${selectedProduct.selectedProductQty} Qunatity of ${selectedProduct.selectedProductName} is selected`)
    }
    componentDidMount() {
        Listings.listItem.forEach(data => {
            let qtyList = [];
            for (let i = 0; i < data.qty; i++) {
                qtyList.push(i)
            }
            let listingObj = {
                id: data.id,
                name: data.name,
                description: data.description,
                qty: qtyList,
                price: data.price,
                image: data.image
            }
            this.state.listingData.push(listingObj)
            this.setState({ currentlyDisplayedData: this.state.listingData })
        })
    }
    addToCart = (event) => {
        event.preventDefault();

        let originalProductList = this.state.productList;
        let removeDuplicates = originalProductList.filter((v, i, a) => a.findIndex(t => (t.selectedProductName === v.selectedProductName)) === i)
        this.setState({ productReadyForCart: removeDuplicates })
        CustomToastr.success(`${this.state.productList.length} product added to cart.`)
    }
    checkout = (event) => {
        event.preventDefault();
        this.props.history.push('/cart', { productReadyForCheckout: this.state.productReadyForCart });
    }
    render() {
        return (
            <>
            <Header id="header" />
            <Container fluid={false}>                
                <Row noGutters={true}>
                    <Col md={{ size: 8 }}></Col>
                    <Col md={{ size: 2 }}>
                        {
                            this.state.selectedProductList.length !== 0 ?
                                <Button type="submit" label="Add To Cart" handleClick={this.addToCart} />
                                : null
                        } {" "}
                        {
                            this.state.productReadyForCart.length !== 0 ?
                                <Button type="warning" label="Checkout" handleClick={this.checkout} />
                                : null
                        }
                    </Col>
                </Row>
                <br />
                <form>
                    <Row noGutters={true}>
                        {
                            this.state.currentlyDisplayedData.length !== 0 ?
                                this.state.currentlyDisplayedData.map(itemData => {
                                    return (
                                        <Col key={itemData.length} md={{ size: 3, offset: 1 }}>
                                            <Card>
                                                <CardImg top width="100%" src={`${BASE_URL}/${itemData.image}`} />
                                                <CardBody>
                                                    <CardTitle id="cardName">{itemData.name}</CardTitle>
                                                    <CardText id="cardDesc">{itemData.description}</CardText>
                                                    <CardText>
                                                        <Row className="cardInfo">
                                                            <Col md={{ size: 4 }} id="cardPrice">{itemData.price}</Col>
                                                            <Col md={{ size: 6 }} id="qtyDisplay">Qty:
                                                            <Col md={{size: 2}}>
                                                            <Input type="select" name={itemData.name} value={this.state.selectedQty} onChange={this.handleChange} id="cardQty">
                                                                    {
                                                                        itemData.qty.map(data => { return (<option key={data} value={data}> {data}</option>) })
                                                                    }
                                                                </Input>
                                                            </Col>
                                                            </Col>
                                                        </Row>
                                                    </CardText>
                                                </CardBody>
                                            </Card> <br />
                                        </Col>
                                    )
                                })
                                :
                                <Col>
                                    <h2>Could not load your Item list</h2>
                                </Col>
                        }
                    </Row>
                </form>
            </Container>
            </>
        )
    }
}

export default withRouter(ListingPage);