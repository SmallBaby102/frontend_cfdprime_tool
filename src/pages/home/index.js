import React, { useState } from "react";
import axios from "axios";

import { Container, Grid } from "@mui/material";
import { Box, Button, Stack } from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import NormalCard from "../../sections/components/normalCard";
import Input from "../../sections/components/input";
import { BASE_URL } from "../../config/const";
import './index.scss';

import { changeResult } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorAddress, setErrorAddress] = useState("");
    const [errorAmount, setErrorAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [modal, setModal] = useState(false);
    const [itemData, setItemData] = useState(null);
    const onClickHereToGet = () => {
        setModal(true);
    }
    const CheckHandle = async () => {
        if (loading) return;
    
        if (!address) {
            setErrorAddress("Please input your trading account id!");
            return;
        }
        setErrorAddress("");

        if (amount < 100 || amount > 9000) {
            setErrorAmount("Số tiền nạp phải từ 100 đến 9000 USD!");
            return;
        }
        setErrorAmount("");
        setLoading(true);
         axios.post(`${BASE_URL}/api/router/buy`, {
            receive_address : address,
            receive_amount : amount,
            user_info : "",
        }).then(response => {
            if (response.data.success === true) {
                setItemData(response.data.data.order);
                setModal(true);
                console.log("ss", response.data.data.order)
                dispatch(changeResult(response.data.data.order));
                navigate("/result");
            } else {
                console.log("failed to save")
                setErrorAmount("Amount error");
            }
            setLoading(false)
        })
        .catch( e => {
            setLoading(false)
            setErrorAddress(e.response.data.message)
        })
    }
    return (
        <Container>
            <Grid container spacing={6} mt={2} mb={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <NormalCard  className="container" title="DEPOSIT BY VIETNAM BANKING TRANSFER" component={
                        <>
                            <Stack className="address-wrap" sx={{ marginRight: "10px" }} direction="row" alignItems="center" justifyContent="space-between">
                                <label htmlFor="address" style={{ marginRight: "10px" }}>Your Trading Account Id : </label>
                                <Input id="address" value={address} changeHandle={setAddress} placeholder="Trading Account Id" />
                                {
                                    errorAddress && <span className="error">{errorAddress}</span>
                                }
                            </Stack>
                            <Stack className="address-wrap" sx={{ marginRight: "10px", marginTop: "30px" }} direction="row" alignItems="center" justifyContent="space-between">
                                <label htmlFor="amount" style={{ marginRight: "10px" }}>Deposit Amount(USD) : </label>
                                <Input id="amount" value={amount} changeHandle={setAmount} placeholder="Nhập số tiền theo USD" />
                                {
                                    errorAmount && <span className="error" style={{ top: "140px", right: "28px" }}>{errorAmount}</span>
                                }
                            </Stack>
                            <Stack className="btn-wrap" style={{ marginTop: "50px" }} direction="row" alignItems="center" justifyContent="space-around">
                                <Button onClick={CheckHandle} className={"custom-btn " + (errorAmount ? "sm-mb" : "")} variant="contained">{loading === true? "Loading":"Submit"}</Button>
                            </Stack>
                        </>

                    }>
                    </NormalCard>
                </Grid>
            </Grid> 
        </Container>
    );
}