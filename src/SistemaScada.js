import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import Chart from "./Chart";
import horno from "./Horno.png"

export default function SistemaScada() {
    const [voltaje, setVoltaje] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [periodoDeMuestreo, setPeriodoDeMuestreo] = useState(0);

    const [encendido, setEncendido] = useState(false);
    const [referencia, setReferencia] = useState(0);
    const [temperaturaChart, setTemperaturaChart] = useState([]);
    const [referenciaChart, setReferenciaChart] = useState([]);
    const [tiempoChart, setTiempoChart] = useState([0]);
    const [instante, setInstante] = useState(false);

    var bandera = false;


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
        setTemperaturTimeOut()
    }, [temperatura]);

    useEffect(() => {
        if (!instante) {
            setInstante(true);
        }
    }, [instante]);

    function setTemperaturTimeOut() {
        let pointsTemperatura = temperaturaChart;
        let pointsReferencia = referenciaChart;
        let pointsTiempo = tiempoChart;
        if (temperatura > 0) {
            pointsTemperatura.push(temperatura);
            pointsTiempo.push(pointsTiempo[tiempoChart.length - 1] + parseInt(periodoDeMuestreo, 10));
            pointsReferencia.push(referencia);

            setTemperaturaChart(pointsTemperatura);
            setTiempoChart(pointsTiempo);
            setReferenciaChart(pointsReferencia);
            aplicarFormulaDeTemperatura();
        }
    }

    function aplicarFormulaDeTemperatura() {
                

        if (voltaje != 0) {
            setTimeout(() => {
                ejecutar();
            }, periodoDeMuestreo * 1000);
        }
        else if (temperatura > 0) {
            setTimeout(() => {
                setTemperaturTimeOut();
            }, periodoDeMuestreo * 1000);

        }
    }

    function exportar() {
        exportInfo = tiempoChart.map((element, i) => {
            return {
                tiempo: element,
                temperatura: temperaturaChart[i - 1] ? temperaturaChart[i - 1] : 0
            }
        })
        let texto = "";
        exportInfo.map((element) => {
            texto += JSON.stringify(element) + "\n";
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

    function ejecutar() {
        let num = [1.1 * 0.008594, 1.1 * 0.008548]
        let Entrada = [temperatura, 1, periodoDeMuestreo, voltaje];
        let SalidaSis = [0, 0, 0, 0];
        let Referencia = [0, 0, 0, 1]
        let error = [0, 0, 0, 0];
        let u = [1, 1, 1, 1]
        var den = [1.984, -0.9841];
        var Ts = 1;
        error = Referencia[3];
        var i = 3

        while (i < 249) {
            Referencia[i] = 1;
            SalidaSis[i] = (num[0] * u[i - 1]) + (num[1] * u[i - 2]) + (den[0] * SalidaSis[i - 1]) + (den[1] * SalidaSis[i - 2]);
            i ++;
            u[i] = 1;            
        }
        SalidaSis[i] = SalidaSis[i - 1];
        u[i] = 0;

        var t = new Array();
        var j = 0
        while (j < SalidaSis.length) {
            t[j] = j;
            SalidaSis[j] = SalidaSis[j] + 81.5
            j ++;
            setTemperatura(SalidaSis[j]);
            console.log(SalidaSis[j])            
        }        
        

        /*var random = new TimeSeries();
        setInterval(function () {
            random.append(Date.now(), SalidaSis[j - 1]);
        }, Entrada[2]*1000);
    
        var chart = new SmoothieChart({grid: { strokeStyle:'dark', fillStyle:'White' }, labels: { fillStyle:'rgb(60, 0, 0)' }, responsive: true });
        chart.addTimeSeries(random, { strokeStyle: 'blue', fillStyle: 'rgba(0,0,255,0.3)', lineWidth: 6 });
        chart.streamTo(document.getElementById("chart-responsive"),  Entrada[2]*1000);*/
    }

    return (
        <div style={{ fontFamily: "Arial" }}>
            <div style={{ display: "inline-block", width: "1%" }}>
                <Card className="imagen" style={{ width: "300px", marginLeft: "30px", display: "inline-block" }}>
                    <h3 style={{ fontSize: "30px", fontFamily: "Arial", marginLeft: "100px" }}>Scada</h3>
                    <img src={horno} style={{ width: "200px", }}></img>
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
                        <Button
                            style={{ display: "inline-block", marginLeft: "50px", marginTop: "10px" }}
                            onClick={() => exportar()}
                        >
                            Exportar info
                        </Button>
                        <Button
                            style={{ display: "inline-block", marginLeft: "70px", marginTop: "10px" }}
                            onClick={() => window.location.reload(true)}                        >
                            Reiniciar
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card style={{ marginLeft: "370px", width: "69%", marginBottom: "-10px", height: "100%", display: "inline-block" }}>
                <CardContent>
                    <h3 style={{ fontSize: "30px", marginLeft: "180px" }}>Historico</h3>
                    {instante && (
                        <Chart
                            key={tiempoChart}
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
