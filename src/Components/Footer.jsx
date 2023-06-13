import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";
export default function Footer() {
  return (
    <footer className="nb-footer">
      <Container>
        <Row>
          <Col sm={12}>
            <div className="about">
              <p>
                This page was built by Avner Levy for the sake of Israeli
                Pokemon card traders. To connect between best buyer with top
                card sellers. To create the best community in one place.
              </p>
              {/* <div className="social-media">
                <ul className="list-inline">
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </Col>

          <Col md={3} xs={6}>
            <div className="footer-info-single">
              <h2 className="title">Help Center</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> How to Pay
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> FAQ's
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Sitemap
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Delivery Info
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={3} xs={6}>
            <div className="footer-info-single">
              <h2 className="title">Customer information</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> About Us
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> FAQ's
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Sell Your Items
                  </a>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> RSS
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={3} xs={6}>
            <div className="footer-info-single">
              <h2 className="title">Security & privacy</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Return / Refund
                    Policy
                  </a>
                </li>
                <li>
                  <a href="http://www.nextbootstrap.com/" title="">
                    <i className="fa fa-angle-double-right"></i> Store Locations
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={3} xs={6}>
            <div className="footer-info-single">
              <h2 className="title">Payment</h2>
              <p>
                This page was built by Avner Levy for the sake of Israeli
                Pokemon card traders. To connect between best buyer with top
                card sellers
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <section className="copyright">
        <Container>
          <Row>
            <Col sm={6}>
              <p>Copyright © 2017. Your Company.</p>
            </Col>
            <Col sm={6}></Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
