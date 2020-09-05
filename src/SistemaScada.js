import React, {useEffect,useState} from 'react'
import { Button,Card,CardContent,CircularProgress } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Chart from "./Chart";


export default function SistemaScada(){

    const [encendido,setEncendido] = useState(false)
    const [temperatura,setTemperatura] = useState(0)
    const [voltaje,setVoltaje] = useState(null)
    const [periodoDeMuestreo,setPeriodoDeMuestreo] = useState(null)
    const [referencia,setReferencia] = useState(null)
    const [temperaturaChart, setTemperaturaChart] = useState([200, 185, 590, 621, 250, 400, 95])
    const [referenciaChart,setReferenciaChart] = useState([700,700,700,700,700,700,700])
    const [tiempoChart,setTiempoChart] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
    useEffect(()=>{
        if(!encendido){
            setTemperatura(0)
        }
    },[encendido])

    function encenderHorno(){
        if(referencia && voltaje && periodoDeMuestreo){
            setEncendido(!encendido)
        }
        else{
            alert("Debe llenar todos los campos para encender el horno")
        }
    }

    return(
        <div style={{fontFamily:"Arial"}}>
            <div style ={{display:"inline-block" ,width:"1%", }}>
                <Card className="imagen" style={{width:"300px",marginLeft:"30px",display:"inline-block"}}>
                    <h3 style={{    fontSize: "30px",fontFamily:"Arial",marginLeft:"100px"}}>Scada</h3>
                    <CardContent>
                        <img src ={"https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/117335165_3479340692133084_5927977114661400265_o.jpg?_nc_cat=100&_nc_sid=730e14&_nc_eui2=AeGQH10Ik41Z4q7r_iYVeRucYEI2slV4h4BgQjayVXiHgIlGpEDEWMNXz2WHbDEkLlwWh8TkwIbdpHyMf_A7swFG&_nc_ohc=LQgjy0qe9yoAX-U4k5S&_nc_ht=scontent-bog1-1.xx&oh=ff0fff86bbe8b6a4535f2efaadd9d6b1&oe=5F56BA2A"}
                             style={{width:"100%",marginLeft:"10px"}}/>
                    </CardContent>
                </Card>
                <Card style={{marginLeft:"30px",width:"300px", display:"block"}}>
                    <CardContent>
                        <div style={{ display: "inline-block", marginRight: "5px",fontSize:"25px" }}>Temperatura: {temperatura}º</div>
                        <TextField
                            style={{marginTop:"20px",marginLeft:"20px"}}
                            id="standard-number"
                            label="Voltaje"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={voltaje}
                            onChange={(event)=>setVoltaje(event.target.value)}
                        />
                        <TextField
                            style={{marginTop:"10px",marginLeft:"20px"}}
                            id="standard-number"
                            label="Periodo de muestreo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={periodoDeMuestreo}
                            onChange={(event)=>setPeriodoDeMuestreo(event.target.value)}
                        />
                        <TextField
                            style={{marginTop:"10px",marginLeft:"20px"}}
                            id="standard-number"
                            label="Referencia"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={referencia}
                            onChange={(event)=>setReferencia(event.target.value)}
                        />
                        <Button
                            style={{ display: "inline-block",marginLeft:"70px", marginTop:"10px" }}
                            size="small" variant="contained" color={encendido?"secondary":"primary"}
                            onClick={()=>encenderHorno()}
                        >{encendido?"Apagar":"Encender"}</Button>{' '}
                    </CardContent>
                </Card>
            </div>

            <Card style={{marginLeft:"370px",width:"69%", marginBottom:"-10px", height:"100%",display:"inline-block"}}>
                <CardContent>
                    <h3 style={{    fontSize: "30px",marginLeft:"180px"}}>Historico</h3></CardContent>
                <Chart data={{
                    temperatura: temperaturaChart,
                    tiempo:tiempoChart,
                    referencia:referenciaChart
                }}/>
            </Card>
        </div>

    )

}