import React, { useState} from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const headerStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}



TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


const Header = ( props ) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [usernameRequired, setUserNameRequired] = useState("displayBlank");
    const [username, setUserName] = useState("");
    const [loginPasswordRequired, setLoginPasswordRequired] = useState("displayBlank");
    const [loginPassword, setLoginPassword] = useState("");
    const [firstnameRequired, setFirstNameRequired ] =useState("displayBlank");
    const [firstname, setFirstName] = useState("");
    const [lastnameRequired, setLastNameRequired] = useState("displayBlank");
    const [lastname, setLastName] = useState("");
    const [emailRequired, setEmailRequired] = useState("displayBlank");
    const [email, setEmail] = useState("");
    const [registerPasswordRequired, setRegisterPasswordRequired] = useState("displayBlank");
    const [registerPassword, setRegisterPassword] = useState("");
    const [contactRequired, setContactRequired] = useState("displayBlank");
    const [contact, setContact] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("access-token")== null ? false : true);
    const [loginApiError, setLoginApiError] = useState("");
    


    const openModalHandler = () => {
    
     
        setModalIsOpen(true);
        setValue(0);
        setUserNameRequired("displayBlank");
        setUserName("");
        setLoginPasswordRequired("displayBlank");
        setLoginPassword("");
        setFirstNameRequired("displayBlank");
        setFirstName("");
        setLastNameRequired("displayBlank");
        setLastName("");
        setEmailRequired("displayBlank");
        setEmail("");
        setRegisterPasswordRequired("displayBlank");
        setRegisterPassword("");
        setContactRequired("displayBlank");
        setContact("");
        
    
    }



   const closeModalHandler = () => {
        setModalIsOpen(false);
    }

    
  
    const tabChangeHandler = (event, value) => {
        setValue(value);
      
    }



    const  loginClickHandler = () => {

      
        username === "" ? setUserNameRequired("blockDisplay") : setUserNameRequired("displayBlank" );
        loginPassword === "" ? setLoginPasswordRequired("blockDisplay") :setLoginPasswordRequired("displayBlank");
        
        setLoginApiError("");
        if(username === "" || loginPassword === "") return;     

    
        let dataLogin = null;
        fetch(props.baseUrl + "auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Basic " + window.btoa(username + ":" + loginPassword)

            },
            body: dataLogin,
        })
        .then(async(response) => {
            if(response.ok){
                sessionStorage.setItem("access-token",response.headers.get("access-token"));
                 return response.json();
        } else{
            let error = await response.json();
            setLoginApiError(error.message);
            throw new Error("Something Went Wrong");

        }
        })
        .then((data) => {
            sessionStorage.setItem("uuid", data.id);
            setLoggedIn(true);
            closeModalHandler();

        }).catch((error) => {});
    };
    
    const  inputUsernameChangeHandler = (e) => {
        setUserName( e.target.value);
    }

    const inputLoginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }


    const  registerClickHandler = () => {

        setFirstName === "" ? setFirstNameRequired("blockDisplay" ) : setFirstNameRequired("displayBlank");
        setLastName === "" ? setLastNameRequired("blockDisplay") : setLastNameRequired("displayBlank");
        setEmail === "" ? setEmailRequired("blockDisplay") : setEmailRequired("displayBlank");
        setRegisterPassword === "" ? setRegisterPasswordRequired("blockDisplay") : setRegisterPasswordRequired("displayBlank");
        setContact === "" ? setContactRequired("blockDisplay") : setContactRequired("displayBlank");



        let dataSignup = JSON.stringify({
            email_address: email,
            first_name: firstname,
            last_name: lastname,
            mobile_number:contact,
            password: registerPassword
        });

        fetch(props.baseUrl + "signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Basic" + window.btoa(username + ":" + loginPassword)

            },
            body: dataSignup,
        }).then((data) => {setRegistrationSuccess(true)});


    }


    
   
    const inputFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    }

    const inputLastNameChangeHandler = (e) => {
        setLastName( e.target.value);
    }

    const inputEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const inputRegisterPasswordChangeHandler = (e) => {
        setRegisterPassword(e.target.value);
    }

    const inputContactChangeHandler = (e) => {
        setContact(e.target.value);
    }

    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        console.log(' reached here');
        setLoggedIn(false);
    }


    return (
        <div>
            <header className="header">
                <img src={logo} className="logoOfApplication" alt="Movies App Logo" />
                {!loggedIn ?
                    <div className="loginButton">
                        <Button variant="contained" color="default" onClick={openModalHandler}>
                            Login
                        </Button>
                    </div>
                    :
                    <div className="loginButton">
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }
                {props.showBookShowButton === "true" && !loggedIn
                    ? <div className="bookButton">
                        <Button variant="contained" color="primary" onClick={openModalHandler}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {props.showBookShowButton === "true" && loggedIn
                    ? <div className="bookButton">
                        <Link to={"/bookshow/" + props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }

            </header>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                contentLabel="Login"
                onRequestClose={closeModalHandler}
                style={headerStyle}
            >
                <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={username} onChange={inputUsernameChangeHandler} />
                            <FormHelperText className={usernameRequired}>
                                <span className="modifyColor">Username required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={loginPassword} onChange={inputLoginPasswordChangeHandler} />
                            <FormHelperText className={loginPasswordRequired}>
                                <span className="modifyColor">Password required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {loggedIn === true &&
                            <FormControl>
                                <span >
                                    Login Successful!
                                </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                }

                {value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={firstname} onChange={inputFirstNameChangeHandler} />
                            <FormHelperText className={firstnameRequired}>
                                <span className="modifyColor">FirstName required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={lastname} onChange={inputLastNameChangeHandler} />
                            <FormHelperText className={lastnameRequired}>
                                <span className="modifyColor">LastName required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={email} onChange={inputEmailChangeHandler} />
                            <FormHelperText className={emailRequired}>
                                <span className="modifyColor">Email required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={registerPassword} onChange={inputRegisterPasswordChangeHandler} />
                            <FormHelperText className={registerPasswordRequired}>
                                <span className="modifyColor">Password required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={contact} onChange={inputContactChangeHandler} />
                            <FormHelperText className={contactRequired}>
                                <span className="modifyColor">Phone number required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {registrationSuccess === true &&
                            <FormControl>
                                <span >
                                    Registration Successful. Please Login!
                                  </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={registerClickHandler}>REGISTER</Button>
                    </TabContainer>
                }
            </Modal>
        </div>
    )

}

export default Header;
