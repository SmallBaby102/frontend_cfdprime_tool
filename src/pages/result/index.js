import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Container, Grid } from "@mui/material";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'black',
    border: '2px solid #000',
    color: '#000',
    boxShadow: 24,
    paddingLeft: 8,
  };

export default function Result() {
    const result = useSelector(state => state.data.result)
    const [itemData, setItemData] = useState(null);
    const navigate = useNavigate();

    const Ref = useRef(null);
   // The state for our timer
   const [timer, setTimer] = useState('00:00:00');
  
  
   const getTimeRemaining = (e) => {
       const total = Date.parse(e) - Date.parse(new Date());
       const seconds = Math.floor((total / 1000) % 60);
       const minutes = Math.floor((total / 1000 / 60) % 60);
       const hours = Math.floor((total / 1000 / 60 / 60) % 24);
       return {
           total, hours, minutes, seconds
       };
   }
   const startTimer = (e) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(e);
    if (total >= 0) {

        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the beginning of the variable
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
        }
    }


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:10:00');

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setMinutes(deadline.getMinutes() + 10);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const back = async () => {
        navigate("/");

    }

    return (
        <Container>
            <Grid container spacing={6} mt={2} mb={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                {
                    // result && 
                    <Box sx={style}>
                        <Typography  variant="h6" component="h2" style={{ textAlign:"right"}}>
                            <Button variant="outlined" color="primary"  onClick={back}  startIcon={<CloseIcon />} >
                                Back
                            </Button>
                        </Typography>
                        <Typography  variant="h6" component="h2">
                            Vui lòng mở ứng dụng Mobile Banking bất kỳ để quét mã QR.
                            Lưu ý: Nhập chính xác số tiền và nội dung bên dưới khi chuyển khoản
                            (tất cả thông số sẽ được điền tự động khi quét mã QR bên dưới)
                        </Typography>
                        <Typography  variant="h6" component="h6"   sx={{marginTop: 1}}>
                            Số tiền : {result?.amount.toLocaleString(undefined, {maximumFractionDigits:3})} VND
                        </Typography>
                        <Typography  variant="h6" component="h6">
                            Nội dung chuyển khoản : {result?.bankTransfer.transfer_code}
                        </Typography>
                        <Typography  variant="h6" component="h6" sx={{marginTop: 1}}>
                        Vui lòng thực hiện lệnh chuyển khoản trong vòng 10 phút. Sau thời gian trên yêu cầu nạp tiền của bạn sẽ bị hủy bỏ : 
                        <br/>
                        {timer}
                        </Typography>
                        <ImageList sx={{ width: "100%", height: "94%", marginTop: 5}} cols={4}>
                            {result?.listBank?.map((item) => (
                                <ImageListItem key={item.id}  sx={{ width: 200 }}  >
                                    <img
                                        src={`${item.qr_code_url}`}
                                        srcSet={`${item.qr_code_url}`}
                                        alt={item.code}
                                        loading="lazy"
                                        
                                    />
                                    <ImageListItemBar
                                        sx={{color: "white"}}
                                        title={item.name}
                                        subtitle={<span>Id: {item.account_no}</span>}
                                        position="below"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                }
                </Grid>
            </Grid> 
       
               
        </Container>
    );
}