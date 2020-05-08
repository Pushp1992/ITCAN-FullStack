import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import '../cart/cart.css';
import Listings from '../../service/listingService';
import '../listingPage/listingPage.css';
import { Container, Row, Col, Label, Input, Card, Button, CardText, CardBody, CardTitle } from "reactstrap";

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
        }
        this.removeProduct = this.removeProduct.bind(this)
    }
    removeProduct = (event) => {
        event.preventDefault();
        const productName = event.currentTarget.value;
        var removeIndex = this.state.selectedproduct.map(function(item) { return item.name; }).indexOf(productName);
        this.state.selectedproduct.splice(removeIndex, 1);
        this.setState({...this.state.selectedproduct})
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
                                    {
                                        this.state.selectedproduct.map(itemData => {
                                            return (
                                                <Col key={itemData.length} md={{ size: 3, offset: 1 }}>
                                                    <Card>
                                                        <img id="cardImg" width="100%" src={`${BASE_URL}/${itemData.image}`} />
                                                        <CardBody>
                                                            <CardTitle id="cardName">{itemData.name}</CardTitle>
                                                            <CardText id="cardDesc">{itemData.description}</CardText>
                                                            <CardText>
                                                                <Row className="cardInfo">
                                                                    <Col md={{ size: 4 }} id="cardPrice">{itemData.price}</Col>
                                                                    <Col md={{ size: 7 }} id="qtyDisplay">Select Quantity:
                                                                     <Input type="select" name={itemData.name} value={this.state.selectedQty} onChange={this.handleChange} id="cardQty">
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
                            </form>
                        </Container>
                }

            </React.Fragment>
        )
    }
}

export default CartPage;