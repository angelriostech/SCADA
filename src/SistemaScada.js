import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import Chart from "./Chart";
import horno from "./Horno.png"

export default function SistemaScada() {
    const [encendido, setEncendido] = useState(false);
    const [temperatura, setTemperatura] = useState(0);
    const [voltaje, setVoltaje] = useState(0);
    const [periodoDeMuestreo, setPeriodoDeMuestreo] = useState(0);
    const [referencia, setReferencia] = useState(0);
    const [temperaturaChart, setTemperaturaChart] = useState([]);
    const [referenciaChart, setReferenciaChart] = useState([]);
    const [tiempoChart, setTiempoChart] = useState([0]);
    const [instante, setInstante] = useState(false);
    var exportInfo = [];    


    function downloadTxtFile(texto) {
        const element = document.createElement("a");
        const file = new Blob([texto],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "Reporte.txt";
        document.body.appendChild(element);
        element.click();
    }

    useEffect(() => {
        if (encendido) {
            aplicarFormulaDeTemperatura();
        } else {
            setVoltaje(0);
            aplicarFormulaDeTemperatura();
        }
    }, [encendido]);

    useEffect(() => {
        if (temperatura >= referencia && encendido) {
            setEncendido(false);
        }
        if (encendido || referenciaChart.length > 0) {
            aplicarFormulaDeTemperatura();
            let pointsTemperatura = temperaturaChart;
            let pointsReferencia = referenciaChart;
            let pointsTiempo = tiempoChart;
            if (temperatura > 0) {
                pointsTemperatura.push(temperatura);
                pointsTiempo.push(pointsTiempo[tiempoChart.length - 1] + parseInt(periodoDeMuestreo, 10));
                pointsReferencia.push(referencia);
            }
            setTemperaturaChart(pointsTemperatura);
            setTiempoChart(pointsTiempo);
            setReferenciaChart(pointsReferencia);
        }
    }, [temperatura]);

    useEffect(() => {
        if (!instante) {
            setInstante(true);
        }
    }, [instante]);

    function aplicarFormulaDeTemperatura() {
        if (voltaje!=0 && temperatura <= referencia) {
            setTimeout(() => {
                if (temperatura === referencia) setTemperatura(temperatura - periodoDeMuestreo);
                else setTemperatura(voltaje * periodoDeMuestreo + temperatura);
            }, periodoDeMuestreo * 1000);
        } else if ( temperatura > 0) {
            setTimeout(() => {
                setTemperatura(temperatura - periodoDeMuestreo);
            }, periodoDeMuestreo * 1000);
           
        }
    }
    function exportar() {
        exportInfo = tiempoChart.map((element, i) => {
            return {
                tiempo: element,
                temperatura: temperaturaChart[i - 1]? temperaturaChart[i - 1]:0
            }
        })
        let texto="";
        exportInfo.map((element)=>{
            texto+=JSON.stringify(element)+"\n";            
        });
        console.log(texto);        
        downloadTxtFile(texto);

    }

    function encenderHorno() {
        if (referencia && voltaje && periodoDeMuestreo) {
            setEncendido(!encendido);
        } else {
            alert("Debe llenar todos los campos para encender el horno");
        }
    }

    return (
        <div style={{ fontFamily: "Arial" }}>
            <div style={{ display: "inline-block", width: "1%" }}>
                <Card className="imagen" style={{ width: "300px", marginLeft: "30px", display: "inline-block" }}>
                    <h3 style={{ fontSize: "30px", fontFamily: "Arial", marginLeft: "100px" }}>Scada</h3>
                    <img src={horno} style={{width:"200px", }}></img>
                </Card>
                <Card style={{ marginLeft: "30px", width: "300px", display: "block" }}>
                    <CardContent>
                        <div style={{ display: "inline-block", marginRight: "5px", fontSize: "25px" }}>
                            Temperatura: {temperatura}º
                        </div>
                        <TextField
                            style={{ marginTop: "20px", marginLeft: "20px" }}
                            id="standard-number"
                            label="Voltaje"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={voltaje}
                            onChange={(event) => setVoltaje(event.target.value)}
                        />
                        <TextField
                            style={{ marginTop: "10px", marginLeft: "20px" }}
                            id="standard-number"
                            label="Periodo de muestreo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={periodoDeMuestreo}
                            onChange={(event) => setPeriodoDeMuestreo(event.target.value)}
                        />
                        <TextField
                            style={{ marginTop: "10px", marginLeft: "20px" }}
                            id="standard-number"
                            label="Referencia"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={referencia}
                            onChange={(event) => setReferencia(event.target.value)}
                        />
                        <Button
                            style={{ display: "inline-block", marginLeft: "70px", marginTop: "10px" }}
                            size="small"
                            variant="contained"
                            color={encendido ? "secondary" : "primary"}
                            onClick={() => encenderHorno()}
                        >
                            {encendido ? "Apagar" : "Encender"}
                        </Button>{" "}
                        {temperatura===0&&<Button
                            style={{ display: "inline-block", marginLeft: "50px", marginTop: "10px" }}
                            onClick={() => exportar()}
                            
                        >
                            Exportar info
                        </Button>}
                    </CardContent>
                </Card>
            </div>

            <Card style={{ marginLeft: "370px", width: "69%", marginBottom: "-10px", height: "100%", display: "inline-block" }}>
                <CardContent>
                    <h3 style={{ fontSize: "30px", marginLeft: "180px" }}>Historico</h3>
                    {instante && (
                        <Chart
                            key={temperatura}
                            data={{
                                tiempo: tiempoChart,
                                referencia: referenciaChart,
                                temperatura: temperaturaChart,
                            }}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
