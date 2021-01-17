import React from 'react';
// import GoogleLogin from 'react-google-login';
import { Button } from 'react-bootstrap'
import icongoogle from '../../images/google_PNG.png'
import { PF } from '../../utils/constants'
import SocialButton from './SocialButton'

export default class GoogleBtn extends React.Component {

    onLoginSuccess (user) {
        console.log(user)
    }

    onLoginFailure (err) {
        console.error(err)
    }

    render () {
        console.log(this.props)
        const responseFacebook = (response) => {
            console.log(response);
        }

        const responseGoogleSuccess = (response) => {
            //console.log(response);
            const param = {
                provider: "GoogleID",
                provider_id: response._profile.id,
                email: response._profile.email,
                fullname: response._profile.name,
                firstname: response._profile.firstName,
                lastname: response._profile.lastName,
                avatar: response._profile.profilePicURL,
                pf: PF

            }
            this.props.callGoogle(param)
        }

        const responseGoogleFail = (response) => {

        }
        
        return (
            // <GoogleLogin
            //     clientId="335446438728-l4nnon4l8js1chj2v372fv8ma84659ua.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            //     buttonText="LOGIN WITH GOOGLE"
            //     onSuccess={responseGoogleSuccess}
            //     onFailure={responseGoogleFail}
            //     cookie={true}
            //     xfbml={true}
            //     autoLoad={false}
            //     isMobile={false}
            //     render={renderProps => (
            //         <Button variant="outline-secondary" block className="clearfix" onClick={renderProps.onClick} disabled={renderProps.disabled}> <span className="float-left">
            //             <img src={icongoogle} height="24" />
            //         </span>
            //             Sign up with Google</Button>
            //     )}
            // />

            // <div class="row">
            //     <div class="col-md-3">
            //         <a class="btn btn-outline-dark" href="/users/googleauth" role="button" style="text-transform:none">
            //             <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            //             Login with Google
            //         </a>
            //     </div>
            // </div>
            <SocialButton
                autoLoad={false}
                provider='google'
                appId='335446438728-l4nnon4l8js1chj2v372fv8ma84659ua.apps.googleusercontent.com'
                onLoginSuccess={responseGoogleSuccess}
                onLoginFailure={responseGoogleFail}
                // getInstance={this.setNodeRef.bind(this, 'google')}
                key={'google'}
            >
                <img src={icongoogle} height="28" /></SocialButton>
        )
    }
}
// export default GoogleBtn;