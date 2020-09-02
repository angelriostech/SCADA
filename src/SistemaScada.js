import React, {useEffect,useState} from 'react'
import { Button,Card,CardContent,CircularProgress } from '@material-ui/core';


export default function SistemaScada(){

    const [encendido,setEncendido] = useState(false)
    const [temperatura,setTemperatura] = useState(0)

    useEffect(()=>{
        if(!encendido){
            setTemperatura(0)
        }
    },[encendido])

    function cambiarTemperatura(operacion){
        if(operacion ==="aumentar"){
            setTemperatura(temperatura+10);
        }
    }

    return(
        <div style={{fontFamily:"Arial"}}>
            <div style ={{display:"inline-block" ,width:"50%", }}>
                <Card className="imagen" style={{width:"80%",marginLeft:"30px",marginTop:"50px",display:"inline-block"}}>
                    <h3 style={{    fontSize: "30px",fontFamily:"Arial",marginLeft:"120px"}}>Sistema scada</h3>
                    <CardContent>
                        <img src ={"https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/117335165_3479340692133084_5927977114661400265_o.jpg?_nc_cat=100&_nc_sid=730e14&_nc_eui2=AeGQH10Ik41Z4q7r_iYVeRucYEI2slV4h4BgQjayVXiHgIlGpEDEWMNXz2WHbDEkLlwWh8TkwIbdpHyMf_A7swFG&_nc_ohc=LQgjy0qe9yoAX-U4k5S&_nc_ht=scontent-bog1-1.xx&oh=ff0fff86bbe8b6a4535f2efaadd9d6b1&oe=5F56BA2A"}
                             style={{width:"100%",marginLeft:"10px"}}/>
                    </CardContent>
                </Card>
                <Card style={{marginLeft:"30px",width:"80%", display:"block"}}>
                    <CardContent>
                        <h3 style={{    fontSize: "30px",marginLeft:"100px"}}>Controles Horno</h3>
                        <Button
                            style={{ display: "block", marginLeft: "190px" }}
                            size="small" variant="contained" color={encendido?"secondary":"primary"}
                            onClick={()=>setEncendido(!encendido)}
                        >{encendido?"Apagar":"Encender"}</Button>{' '}
                        <div style={{ display: "inline-block", marginRight: "5px",fontSize:"25px" }}>Temperatura: {temperatura}º</div>
                    </CardContent>
                </Card>
            </div>

            <Card style={{marginLeft:"20px", marginBottom:"400px",width:"40%", display:"inline-block"}}>
                <CardContent>
                    <h3 style={{    fontSize: "30px",marginLeft:"90px"}}>Horno de enfriamiento</h3></CardContent>
            </Card>
        </div>

    )

}