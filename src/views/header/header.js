import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../header/header.css';

Container.propTypes = {
    fluid: PropTypes.bool
}

Row.propTypes = {
    noGutters: PropTypes.bool,
    form: PropTypes.bool
}

const Header = () => {
    return (
        <Container fluid={true} id="headerContent">
            <Row noGutters={true}>
                <Col md={{ size: 10 }}>
                    <img src="https://infrrd.ai/sites/all/themes/infrrd/images/in-logo.png" alt="logo" id="logoStyle" />
                </Col>
                <Col md={{ size: 2 }}>
                    {/* <Link to="/cart">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i> <br /> cart
                   </Link> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Header;