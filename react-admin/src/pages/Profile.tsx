import {SyntheticEvent} from 'react';
import { Button, TextField } from "@mui/material";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () =>{
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_cofirm, setPasswordConfim] = useState('');

    const infoSumbit = async(e:SyntheticEvent) =>{
        e.preventDefault();
        await axios.put('users/info/', {
            first_name : first_name,
            last_name  : last_name,
            email      : email
        })
    }

    const PasswordSubmit = async(e:SyntheticEvent) =>{
        e.preventDefault();
        await axios.put('users/password/', {
            password          : password,
            password_confirmation   : password_cofirm
        })
    }

    useEffect(() =>{
        (
            async () =>{
                const {data} = await axios.get('user/');
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
            }
        )();
    },[]);
    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={infoSumbit}>
                <div className="mb-3">
                    <TextField type="text" label="first name" value={first_name} onChange={e => setFirstName(e.target.value)}/>
                    <TextField type="text" label="last name" value={last_name} onChange={e => setLastName(e.target.value)}/>
                    <TextField type="text" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>

            <h3 className="mb">Change Password</h3>
            <form onSubmit={PasswordSubmit}>
                <div className="mb-3">
                    <TextField type="passowrd" label="Password" onChange={e => setPassword(e.target.value)}/>
                    <TextField type="password" label="Password confirm" onChange={e =>setPasswordConfim(e.target.value)}/>
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Layout>
    );
}
export default Profile;