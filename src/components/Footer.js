import React, { Component } from 'react'
import logo from '../images/logo-runex.png'
import googleplay from '../images/btn-googleplay.png'
import appstore from '../images/btn-appstore.png'
import '../style/font-awesome.min.css'

export default class Footer extends Component {
    render () {
        return (
            <footer id="footer" className="container-fluid footer text-white mt">
                {/* <Container> */}
                <div className="row pt-3 pb-5 d-none">
                    <div className="col-md-10 col-12 offset-md-1">
                        <div className="py-2 border-bottom">
                            <h5 className="mr-3 float-left">CONTACT CALL</h5>
                            <h5>084 519 6556</h5>
                        </div>
                        <div className="row text-center text-xs-center text-sm-left text-md-left pt-3">
                            <div className="col-xs-12 col-sm-4 col-md-3">
                                {/* <h5>Your Account</h5> */}
                                <ul className="list-unstyled quick-links">
                                    <li>
                                        {/* <Signin title="Sign up"/> */}
                                        {/* <a href="/signup"><i className="fa fa-angle-double-right"></i>Sign up</a> */}
                                    </li>
                                    <li>
                                        {/* <a href="/login"><i className="fa fa-angle-double-right"></i>Log in</a> */}
                                        {/* <Signin title="Log in"/> */}
                                        {/* <a href="#"><i className="fa fa-angle-double-right">Log in</i></a> */}
                                    </li>
                                    {/* <li><a href="#"><i className="fa fa-angle-double-right"></i>Help</a></li> */}
                                </ul>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-3 d-none">
                                {/* <h5>About Conpanies</h5> */}
                                <ul className="list-unstyled quick-links">
                                    <li>
                                        {/* <Link to="/allevent" ><i className="fa fa-angle-double-right"></i>เกี่ยวกับเรา</Link>     */}
                                        <a href="/about-us"><i className="fa fa-angle-double-right"></i>เกี่ยวกับเรา</a>
                                    </li>
                                    <li>
                                        <a href="/contact"><i className="fa fa-angle-double-right"></i>ติดต่อเรา</a>
                                    </li>
                                    <li>
                                        <a href="/payment-inform"><i className="fa fa-angle-double-right"></i>แจ้งชำระเงิน</a>
                                    </li>
                                    {/* <li><a href="/"><i className="fa fa-angle-double-right"></i>สำหรับองค์กร</a></li> */}
                                </ul>
                            </div>
                            {/* <div className="col-xs-12 col-sm-4 col-md-3">
                                <h5>Our Platform</h5>
                                <ul className="list-unstyled quick-links">
                                    <li><a href="/virtaul-run"><i className="fa fa-angle-double-right"></i>Virtaul Run</a></li>
                                    <li><a href="/tracking-realtime"><i className="fa fa-angle-double-right"></i>Tracking Realtime</a></li>
                                    <li><a href="/runnnig-the-data-analysis"><i className="fa fa-angle-double-right"></i>Runnnig the Data Analysis</a></li>
                                </ul>
                            </div> */}
                        
                        </div>
                    </div>
                </div>
                <div className="row footer-secondary py-3">
                    <div className="col-md-10 col-12 offset-md-1">
                        <div className="clearfix">
                            <div className="float-left py-2">
                                <img
                                    src={logo}
                                    height="48"
                                    className="d-inline-block align-top"
                                    alt="Runex logo"
                                />
                            </div>
                            <div className="float-right">
                                <p className="mb-0">
                                    <span>CONTACT CALL 084 519 6556</span> <span><a href="/about-us">เกี่ยวกับเรา </a></span> 
                                    | <span><a href="/contact">ติดต่อเรา </a></span> 
                                    | <span><a href="/payment-inform">แจ้งชำระเงิน </a></span>
                                    | <span><a href="/terms_and_conditions">Term and conditions </a></span>
                                    | <span><a href="/refund_policy">Refund policy </a></span>
                                    <br/>
                                    <small>
                                    &copy;RUNEX 2019 RUNEX is a wholly owned subsidiary of Think Technology Ltd.
                                    </small>
                                </p>
                                <div className="col-xs-12 col-sm-4 col-md-3">
                                <h5>Our Follow us</h5>
                                <ul className="list-unstyled list-inline social">
                                    <li className="list-inline-item"><a href="https://www.facebook.com/runex.co"><i className="fa fa-facebook"></i></a></li>
                                    {/* <li className="list-inline-item"><a href=""><i className="fa fa-youtube-play"></i></a></li>
                                    <li className="list-inline-item"><a href=""><i className="fa fa-twitter"></i></a></li> */}
                                </ul>
                                <div className="clearfix">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <a href="https://apps.apple.com/th/app/runex/id1487320937">
                                            <img
                                                src={appstore}
                                                width="100%"
                                                className="d-inline-block align-top"
                                                alt="Runex logo"
                                            />
                                            </a>
                                        </div>
                                        <div className="col-sm-6">
                                            <a href="https://play.google.com/store/apps/details?id=com.think.runex">
                                            <img
                                                src={googleplay}
                                                width="100%"
                                                className="d-inline-block align-top"
                                                alt="Runex logo"
                                            />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                                {/* <ul className="list-inline mb-0">
                                    <li className="list-inline-item">Terms of Service</li>
                                    <li className="list-inline-item">PrivacyPolicy</li>
                                    <li className="list-inline-item">Cookie Policy</li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* </Container> */}
            </footer>
        )
    }
}
