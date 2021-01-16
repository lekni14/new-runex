import React, {useState} from 'react';

const Callback = (props) => {

    const [error, setError] = useState(null);
    const [code, setCode] = useState(null);

    return (
        <div className="container-fluid" style={{marginTop: '10px'}}>
            <div className="card">
                {
                    code ?
                        <div className="card-body">
                            <h5 className="card-title">กำลังเข้าสู่ระบบ...</h5>
                        </div>
                        :
                        <div className="card-body">
                            <div className="card-body">
                                <p className="card-text">{error}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default Callback
