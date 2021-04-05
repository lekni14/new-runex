import React, { Component } from 'react'
import bgContent from '../images/bg-content.svg'
import Layout from '../components/layout'

export default class Contact extends Component {
    render() {
        return (
            <Layout title="ติดต่อเรา">
                <div className="my-5" style={bg}>
                    <div className="text-center" style={{ width: '50%', margin: 'auto', fontSize: '18px', fontFamily: '"Prompt", sans-serif' }}>
                        <h4 className="mb-5">Contact</h4>
                        <p>RUNEX</p>
                        <p>
                            <br />
                        </p>
                        <p>322 Mittaphap r. T.Thapha A.Muang Khon Kaen 40260</p>
                        <p>
                            <br />
                        </p>
                        <p>Phone : 084 519 6556</p>
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
