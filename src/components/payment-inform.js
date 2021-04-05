import React, { Component } from 'react'
import bgContent from '../assets/bg-content.svg'
import Layout from '../components/layout'

export default class PaymentInform extends Component {
    render() {
        return (
            <Layout title="แจ้งชำระเงิน">
                <div className="my-5" style={bg}>
                    <div className="text-center" style={{ width: '50%', margin: 'auto', fontSize: '18px', fontFamily: '"Prompt", sans-serif' }}>
                        <h4 className="mb-5">แจ้งชำระเงิน</h4>
                        <p>RUNEX</p>
                        <p>
                            <br />
                        </p>
                        <p> ส่งสลิปโอนเงินได้ที่ Line ID : </p><a href='http://line.me/ti/p/~runex.co'>runex.co</a>
                        <p>
                            <br />
                        </p>
                        <p>บัญชีธนาคาร : 674-2-04828-2</p>
                        <p>ธนาคาร : กสิกรไทย</p>
                        <p>ชื่อบัญชี : บจก. ธิงค์เทคโนโลยี</p>
                        <br />
                        <p>Email : support@runex.co</p>
                        <p>Facebook : fb.com/runex.co</p>
                        <p>Line ID : runex.co</p>
                    </div>
                </div>
            </Layout>
        )
    }
}

const bg = {
    backgroundImage: `url(${bgContent})`,
    minHeight: '857px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
