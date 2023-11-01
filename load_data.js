import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';
let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la fecha actual
    let actual = fechaActual();

    //Defina un arreglo temporal vacío
    let datos = []
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo

    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;

    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`
  }
cargarPrecipitacion()

let cargarFechaActual = () => {
  
    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h6")

    let tituloH6 = coleccionHTML[0]
    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH6.textContent = fechaActual()
  }
  
let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL1 = "https://api.open-meteo.com/v1/forecast?latitude=-3.9931&longitude=-79.2042&hourly=temperature_2m,uv_index_clear_sky&timezone=auto"; 

  fetch( URL1 )
    .then(responseText => responseText.json())
    .then(responseJSON => {
      
      
      //Respuesta en formato JSON
    
      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot1');
  
      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;
  
      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;
  
      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Temperatura en Loja',
              data: data, 
              borderColor: '#FF6384',
              backgroundColor: '#FFB1C1',
            }
          ]
        }
      };
      
    
      //Objeto con la instanciación del gráfico
      let chart1  = new Chart(plotRef, config);
      
    })
    .catch(console.error);

    let URL2 = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,direct_radiation&timezone=auto";
    fetch( URL2 )
    .then(responseText => responseText.json())
    .then(responseJSON => {
      
      
      //Respuesta en formato JSON
    
      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot2');
  
      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;
  
      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;
  
      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Temperatura en Guayaquil',
              data: data
            }
          ]
        }
      };
      
    
      //Objeto con la instanciación del gráfico
      let chart1  = new Chart(plotRef, config);
    })
    .catch(console.error);
}


cargarPrecipitacion()
cargarFechaActual()
cargarOpenMeteo()