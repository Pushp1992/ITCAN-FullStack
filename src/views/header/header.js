import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../header/header.css';
import logo from '../../images/itcan-logo.png';

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
                    {/* <img src={logo} alt="logo" id="logoStyle" /> */}
                    <span>LOGO</span>
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