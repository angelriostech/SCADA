import React, {useEffect,useState} from 'react'
import { Button,Card,CardContent,CircularProgress } from '@material-ui/core';


export default function SistemaScada(){

    const [encendido,setEncendido] = useState(false)
    const [temperatura,setTemperatura] = useState(0)
    const [lecheEstaCaliente,setLecheEstaCaliente] = useState(false)
    const [showControlesEnfriamiento,setShowControlesEnfriamiento] = useState(false)
    const [showLoading,setShowLoading] = useState(null)
    const [temperaturaEnfriamiento,setTemperaturaEnfriamiento] = useState(90)


    useEffect(()=>{
        if(showLoading == false){
            setShowControlesEnfriamiento(true)
        }

    },[showLoading])

    useEffect(()=>{
        if(!encendido){
            setTemperatura(0)
        }
    },[encendido])

    useEffect(()=>{
        if(temperatura>=90){
            alert("La leche ya esta caliente, por favor pase al horno de enfriamiento.")
            setLecheEstaCaliente(true)
        }
    },[temperatura])

    function cambiarTemperatura(operacion){
        if(operacion ==="aumentar"){
            setTemperatura(temperatura+10);
        }
    }

    return(
        <div style={{fontFamily:"Arial"}}>

            <Card className="imagen" style={{width:"90%",marginLeft:"70px"}}>
                <h3 style={{    fontSize: "30px",fontFamily:"Arial",marginLeft:"500px"}}>Sistema scada</h3>
                <CardContent>
                    <img src ={"https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/117335165_3479340692133084_5927977114661400265_o.jpg?_nc_cat=100&_nc_sid=730e14&_nc_eui2=AeGQH10Ik41Z4q7r_iYVeRucYEI2slV4h4BgQjayVXiHgIlGpEDEWMNXz2WHbDEkLlwWh8TkwIbdpHyMf_A7swFG&_nc_ohc=LQgjy0qe9yoAX-U4k5S&_nc_ht=scontent-bog1-1.xx&oh=ff0fff86bbe8b6a4535f2efaadd9d6b1&oe=5F56BA2A"}
                         style={{width:"50%",marginLeft:"375px"}}/>
                </CardContent>
            </Card>
            <Card style={{marginLeft:"70px", width:"500px", display:"inline-block"}}>
                <CardContent>
                    <h3 style={{    fontSize: "30px",marginLeft:"100px"}}>Controles Horno</h3></CardContent>
                <Button
                    style={{ display: "block", marginLeft: "190px" }}
                    size="small" variant="contained" color={encendido?"secondary":"primary"}
                    onClick={()=>setEncendido(!encendido)}
                >{encendido?"Apagar":"Encender"}</Button>{' '}
                <br></br><br></br>
                <div style={{ display: "inline-block", marginRight: "5px",fontSize:"25px" }}>Temperatura: {temperatura}º</div>
                <Button style={{ display: "inline-block", marginRight: "5px" }} size="small" variant="contained" color="primary" onClick={() => encendido?cambiarTemperatura("aumentar"):alert("El sistema esta apagado, por favor enciendalo para continuar.")}>+</Button>{' '}
                <br></br><br></br>

                { lecheEstaCaliente && !showLoading && <Button
                    style={{ display: "block", marginLeft: "150px" }}
                    size="small" variant="contained" color="primary"
                    onClick={()=>{
                        setShowLoading(true)
                        setTimeout(function(){
                            setShowLoading(false)
                            setEncendido(false)
                            setTemperatura(0)
                            setLecheEstaCaliente(false)
                        },2000)
                    }}>Pasar A horno enfriamiento</Button>}
                <br></br>
                {showLoading && <div>
                    <div style={{marginLeft:"150px"}}>
                        Pasando contenido...
                    </div>
                    <CircularProgress style={{marginLeft:"200px"}} /></div>}

            </Card>
            {showControlesEnfriamiento &&
            <Card style={{marginLeft:"135px", width:"500px", display:"inline-block"}}>
                <CardContent>
                    <h3 style={{    fontSize: "30px",marginLeft:"90px"}}>Horno de enfriamiento</h3></CardContent>
                <br></br><br></br>
                <div style={{ display: "inline-block", marginRight: "5px",fontSize:"25px" }}>Temperatura: {temperaturaEnfriamiento}º</div>
                <Button style={{ display: "inline-block", marginRight: "5px" }} size="small" variant="contained" color="primary" onClick={() =>{
                    if(temperaturaEnfriamiento==40){
                        alert("Ya se ha producido yogur")

                        setShowControlesEnfriamiento(false)
                        setShowLoading(null)
                        setTemperaturaEnfriamiento(90)

                    }else{
                        setTemperaturaEnfriamiento(temperaturaEnfriamiento-10)
                    }
                }}>-</Button>{' '}
                <br></br>
                <br></br>
            </Card>}

        </div>

    )

}