var content = document.querySelector('#content');
var col1 = document.querySelector('.col1');
var col2 = document.querySelector('.col2');
var col3 = document.querySelector('.col3');
var col4 = document.querySelector('.col4');
var col5 = document.querySelector('.col5');
var col6 = document.querySelector('.col6');
var col7 = document.querySelector('.col7');
var col8 = document.querySelector('.col8');
var col9 = document.querySelector('.col9');
var col10 = document.querySelector('.col10');
var NroAuto = 0;
var horaInicial = document.querySelector('#hora');
var horaSalida = new Date();
var horaEntrada = new Date();
// Generar un número aleatorio entre minimo y maximo (inclusive)
const numeroAleatorio = (minimo,maximo)=>{return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo}
const TiempoServicio = (numero)=>{
    var minutos
    if(numero>=1 && numero<=62){
        minutos=1;
    }else if (numero >=63 && numero<=85){
        minutos=2;
    }else if(numero>=86 && numero<=100){
        minutos =3;
    }
    return minutos;
};
const TiempoLlegada = (numero)=>{
    var minutos
    if(numero>=1 && numero<=8){
        minutos=1;
    }else if (numero >=9 && numero<=33){
        minutos=2;
    }else if(numero>=34 && numero<=58){
        minutos =3;
    }else if(numero>=59 && numero<=67){
        minutos =4;
    }else if(numero>=68 && numero<=75){
        minutos =9;
    }else if(numero>=76 && numero<=83){
        minutos =10;
    }else if(numero>=84 && numero<=92){
        minutos =11;
    }else if(numero>=93 && numero<=100){
        minutos =15;
    }
    return minutos
};

horaInicial.addEventListener('change',() => {
    const HoraNueva = horaInicial.value
    const [horas, minutos] = HoraNueva.split(':').map(Number);
    console.log(`Horas: ${horas}, Minutos: ${minutos}`);
    const horaLlegada = new Date();
    horaLlegada.setHours(horas);
    horaLlegada.setMinutes(minutos);
    const nuevaHora = new Date();
    console.log(`Nueva hora: ${nuevaHora.getHours()}:${nuevaHora.getMinutes().toString().padStart(2, '0')}`);
    NroAuto++;
    var aleatorio1 = 0;
    col1.textContent = NroAuto;
    col2.textContent = "-";
    col3.textContent = "-";
    col4.textContent = horaInicial.value;
    col5.textContent = aleatorio1;
    nuevaHora.setHours(horas);
    nuevaHora.setMinutes(minutos + aleatorio1);
    col6.textContent = `${nuevaHora.getHours()}:${nuevaHora.getMinutes().toString().padStart(2, '0')}`;
    var numeroAleatorio1 = numeroAleatorio(1,100);
    var tiempoServicio = TiempoServicio(numeroAleatorio1);
    nuevaHora.setHours(horas);
    nuevaHora.setMinutes(minutos +tiempoServicio);
    col7.textContent = numeroAleatorio1;
    col8.textContent = tiempoServicio;
    col9.textContent = `${nuevaHora.getHours()}:${nuevaHora.getMinutes().toString().padStart(2, '0')}`;
    var TiempoEnElSistema = nuevaHora-horaLlegada;
    const minutoss = TiempoEnElSistema / (1000 * 60);
    col10.textContent = minutoss;
    horaEntrada = horaLlegada;
    horaSalida = nuevaHora;
})
const tabla = document.querySelector(".tabla");
const boton = document.querySelector("#boton");
boton.addEventListener('click',()=>{
    NroAuto++;
    const tr = document.createElement('tr');
    var td = document.createElement('td');
    td.textContent = NroAuto;
    tr.appendChild(td);

    td = document.createElement('td');
    var numeroAleatorio1 = numeroAleatorio(1,100);
    td.textContent = numeroAleatorio1;
    tr.appendChild(td);

    td = document.createElement('td');
    var intervaloLlegada = TiempoLlegada(numeroAleatorio1);
    td.textContent = intervaloLlegada;
    tr.appendChild(td);

    td = document.createElement('td');
    horaEntrada.setMinutes(horaEntrada.getMinutes()+intervaloLlegada);
    td.textContent = `${horaEntrada.getHours()}:${horaEntrada.getMinutes().toString().padStart(2, '0')}`;
    tr.appendChild(td);

    td = document.createElement('td');
    var TiempoEspera = (horaSalida-horaEntrada)>0? (horaSalida-horaEntrada): 0;
    const minutoss = TiempoEspera / (1000 * 60);
    td.textContent = minutoss;
    tr.appendChild(td);

    td = document.createElement('td');
    var horaIngresoServidor = new Date();
    horaIngresoServidor.setHours(horaEntrada.getHours());
    horaIngresoServidor.setMinutes(horaEntrada.getMinutes()+minutoss);
    td.textContent = `${horaIngresoServidor.getHours()}:${horaIngresoServidor.getMinutes().toString().padStart(2, '0')}`;
    tr.appendChild(td);

    td = document.createElement('td');
    var numeroAleatorio2 = numeroAleatorio(1,100);
    td.textContent = numeroAleatorio2;
    tr.appendChild(td);

    td = document.createElement('td');
    var intervaloServicio = TiempoServicio(numeroAleatorio1);
    td.textContent = intervaloServicio;
    tr.appendChild(td);

    td = document.createElement('td');
    horaSalida.setHours(horaIngresoServidor.getHours());
    horaSalida.setMinutes(horaIngresoServidor.getMinutes()+intervaloServicio);
    td.textContent = `${horaSalida.getHours()}:${horaSalida.getMinutes().toString().padStart(2, '0')}`;
    tr.appendChild(td);

    td = document.createElement('td');
    var TiempoEnElSistema = horaSalida-horaEntrada;
    const minutos = TiempoEnElSistema / (1000 * 60);
    td.textContent = minutos;
    tr.appendChild(td);

    tabla.appendChild(tr);
});
