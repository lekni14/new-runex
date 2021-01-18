/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../lib/recoil-atoms';
import { service, userService } from '../services';
import { history } from '../store';
import { utils } from '../utils/utils';
import Cookies from 'js-cookie'

const Callback = (props) => {

    // const useToken = () => ({
    //     setAccessToken: useSetRecoilState(accessToken),
    //     setRefreshToken: useSetRecoilState(refreshToken)
    // })

    const setUserInfo = useSetRecoilState(userInfo)

    // const [error, setError] = useState(null);
    const [code, setCode] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API

        const params = new URLSearchParams(props.location.search)
        const code = params.get('code')
        setCode(code)
        getToken(code)

    });

    const getToken = async (code) => {
        const param = {
            "grant_type": "authorization_code",
            "code": code // from login callback querystring
        }
        const response = await service.verifyCode(param)
        if (response !== undefined && response !== null) {
            if (response.access_token !== null) {
                //useToken.setAccessToken

                utils.setToken(response.runex_access_token)
                utils.setRefreshToken(response.runex_refresh_token)
                getUser()
            }
            // if (response.refresh_token !== null) {
            //     //setRefreshToken(response.refresh_token)
            // }
        }
    }

    async function getUser() {
        const response = await userService.getUser()
        if (response !== undefined && response !== null) {
            utils.setUser(response.data)
            setUserInfo(response.data)
            console.log(Cookies.get('path'))
            history.push(Cookies.get('path'))
            history.go(0)
        }
    }

    return (

        <div className="container-fluid" style={{ marginTop: '10px' }}>
            {

                code ?
                    <div className="card-body">
                        <h5 className="card-title">กำลังเข้าสู่ระบบ...</h5>
                    </div>
                    :
                    <div className="card-body">
                        <div className="card-body">
                            <p className="card-text">ไม่สามารถเข้าสู่ระบบได้</p>
                        </div>
                    </div>
            }
        </div>
    );

}

export default Callback
