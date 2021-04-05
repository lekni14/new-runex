/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import logo from '../images/logo-runex.png'
import googleplay from '../images/btn-googleplay.png'
import appstore from '../images/btn-appstore.png'
import '../style/font-awesome.min.css'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render () {
        return (
            <footer id="footer" className="container-fluid footer text-white">
                {/* <Container> */}
                 {/* <div className="row pt-3 pb-5 d-none">
                    <div className="col-md-10 col-12 offset-md-1">
                        <div className="py-2 border-bottom">
                            <h5 className="mr-3 float-left">CONTACT CALL</h5>
                            <h5>084 519 6556</h5>
                        </div>
                        <div className="row text-center text-xs-center text-sm-left text-md-left pt-3">
                            <div className="col-xs-12 col-sm-4 col-md-3">
                                
                                <ul className="list-unstyled quick-links">
                                    <li>
                                    </li>
                                    <li>
                                        
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-3 d-none">
                                <ul className="list-unstyled quick-links">
                                    <li>
                                        <Link href={`/about-us`}>
                                            <a><i className="fa fa-angle-double-right"></i>เกี่ยวกับเรา</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/contact`}>
                                            <a><i className="fa fa-angle-double-right"></i>ติดต่อเรา</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/payment-inform`}>
                                            <a><i className="fa fa-angle-double-right"></i>แจ้งชำระเงิน</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>  */}
                <div className="footer-secondary py-3">
                    <div className="col-md-10 col-12 offset-md-1">
                        <div className="clearfix">
                            <div className="d-lg-flex justify-content-lg-between align-items-lg-center mb-4">
                                <div><span>CONTACT CALL 084 519 6556</span> </div>
                                <div className="download-app">
                                    <a href="https://apps.apple.com/th/app/runex/id1487320937">
                                        <img
                                            src={appstore}
                                            className="d-inline-block align-top"
                                            alt="Runex logo"
                                        />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.think.runex">
                                        <img
                                            src={googleplay}
                                            className="d-inline-block align-top"
                                            alt="Runex logo"
                                        />
                                    </a>
                                </div> 
                                {/* <div>
                                    <span>Our Follow us : <a href="https://www.facebook.com/runex.co"><i className="fa fa-facebook"></i></a></span> 
                                </div> */}
                            </div>
                            <div className="d-lg-flex justify-content-lg-between align-items-lg-center">
                                <div className="py-2 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        height="40"
                                        className="d-inline-block align-top"
                                        alt="Runex logo"
                                    />
                                    <small className="copyright">
                                        &copy;RUNEX 2019 RUNEX is a wholly owned 
                                        <br/>
                                        subsidiary of Think Technology Ltd.
                                    </small>
                                </div>
                                <div className="">
                                <nav role="navigation" className="mb-0">
                                    <ul className="footer-nav">
                                        <li><a href={`/about-us`}>เกี่ยวกับเรา </a></li>
                                        <li><Link href={`/contact`}><a>ติดต่อเรา </a></Link></li>
                                        {/* <li><Link href={`/payment-inform`}><a>แจ้งชำระเงิน </a></Link></li> */}
                                        <li><Link href={`/term`} ><a>Term and conditions </a></Link></li>
                                        <li><Link href={`/policy`}><a>Refund policy </a></Link></li>
                                    </ul>
                                </nav>
                                {/* <ul className="list-inline mb-0">
                                    <li className="list-inline-item">Terms of Service</li>
                                    <li className="list-inline-item">PrivacyPolicy</li>
                                    <li className="list-inline-item">Cookie Policy</li>
                                </ul> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </Container> */}
            </footer>
        )
    }
}
