import React, {useContext, useEffect, useReducer, useState} from 'react'
import {Button, Card, CardContent, TextField} from '@material-ui/core';
import Chart from "./Chart";
import Refresh from './refresh.svg'

export default function SistemaScada(){

    const [encendido,setEncendido] = useState(false)
    const [temperatura,setTemperatura] = useState(0)
    const [voltaje,setVoltaje] = useState(0)
    const [periodoDeMuestreo,setPeriodoDeMuestreo] = useState(0)
    const [referencia,setReferencia] = useState(0)
    const [temperaturaChart, setTemperaturaChart] = useState([])
    const [referenciaChart,setReferenciaChart] = useState([])
    const [tiempoChart,setTiempoChart] = useState([0])
    const [instante,setInstante] = useState(false)


    useEffect(()=>{
        if(encendido){
            aplicarFormulaDeTemperatura()
        }else{
            setVoltaje(0)
            aplicarFormulaDeTemperatura()
        }
    },[encendido])


    useEffect(()=>{
        if(encendido || referenciaChart.length>0){
            aplicarFormulaDeTemperatura()
            let pointsTemperatura = temperaturaChart
            let pointsReferencia = referenciaChart
            let pointsTiempo = tiempoChart
            if(temperatura>0){
                pointsTemperatura.push(temperatura)
                pointsTiempo.push(pointsTiempo[tiempoChart.length-1]+parseInt(periodoDeMuestreo,10))
                pointsReferencia.push(referencia)
            }
            setTemperaturaChart(pointsTemperatura)
            setTiempoChart(pointsTiempo)
            setReferenciaChart(pointsReferencia)
        }
    },[temperatura])

    useEffect(()=>{
        if(!instante){
            setInstante(true)
        }
    },[instante])
    function aplicarFormulaDeTemperatura(){
        if(voltaje===0 && temperatura>0){
            setTimeout(() => {
                setTemperatura(temperatura-periodoDeMuestreo)
            }, periodoDeMuestreo*1000)
        }
        else{
            setTimeout(() => {
                setTemperatura(voltaje*periodoDeMuestreo+temperatura)
            }, periodoDeMuestreo*1000)
        }

    }

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
                        <Button
                            style={{display: "inline-block",marginTop:"10px", width:"20px"}}
                            onClick={()=>{
                                setInstante(!instante)
                            }}
                        >
                            <img style ={{width:"30px"}} src={Refresh}/>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card style={{marginLeft:"370px",width:"69%", marginBottom:"-10px", height:"100%",display:"inline-block"}}>
                <CardContent>
                    <h3 style={{   fontSize: "30px",marginLeft:"180px"}}>Historico</h3>
                {instante &&<Chart data={{
                    tiempo:tiempoChart,
                    referencia:referenciaChart,
                    temperatura:temperaturaChart
                }}/>}
                    </CardContent>
            </Card>
        </div>

    )

}