let currentData = [];
let historyData = [];

function openExercise(exerciseId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    modal.style.display = 'block';
    
    switch(exerciseId) {
        case 'ast1': showAst1(); break;
        case 'ast2': showAst2(); break;
        case 'ast3': showAst3(); break;
        case 'ast4': showAst4(); break;
        case 'ast5': showAst5(); break;
        case 'env1': showEnv1(); break;
        case 'env2': showEnv2(); break;
        case 'env3': showEnv3(); break;
        case 'env4': showEnv4(); break;
        case 'env5': showEnv5(); break;
        case 'health1': showHealth1(); break;
        case 'health2': showHealth2(); break;
        case 'health3': showHealth3(); break;
        case 'health4': showHealth4(); break;
        case 'health5': showHealth5(); break;
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    currentData = [];
    historyData = [];
}

function showAst1() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Clasificación de Brillo Estelar</h2>
        </div>
        <div class="input-group">
            <label>Magnitud Aparente:</label>
            <input type="number" id="magnitude" step="0.1" placeholder="Ej: -1.5, 2.0, 6.5">
        </div>
        <button class="btn-primary" onclick="classifyMagnitude()">Clasificar</button>
        <button class="btn-secondary" onclick="clearHistory('ast1')">Limpiar Historial</button>
        <div id="result"></div>
        <div id="history"></div>
    `;
}

function classifyMagnitude() {
    const mag = parseFloat(document.getElementById('magnitude').value);
    if (isNaN(mag)) {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Por favor ingrese un valor válido</div>';
        return;
    }

    let classification, badgeClass, description;
    
    if (mag < -1) {
        classification = "Extremadamente Brillante";
        badgeClass = "badge-success";
        description = "Visible incluso en áreas muy iluminadas";
    } else if (mag >= -1 && mag < 1.5) {
        classification = "Muy Brillante";
        badgeClass = "badge-success";
        description = "Fácilmente visible a simple vista";
    } else if (mag >= 1.5 && mag < 3) {
        classification = "Brillante";
        badgeClass = "badge-info";
        description = "Visible en condiciones normales";
    } else if (mag >= 3 && mag < 6) {
        classification = "Débil";
        badgeClass = "badge-warning";
        description = "Requiere buenas condiciones de observación";
    } else {
        classification = "No Visible";
        badgeClass = "badge-danger";
        description = "Requiere instrumentos ópticos";
    }

    historyData.push({mag, classification, time: new Date().toLocaleTimeString()});

    let historyHTML = '';
    historyData.forEach((item, index) => {
    });
    historyHTML += '</div>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Resultado</h3>
            <div class="result-item">
                <strong>Magnitud:</strong> ${mag.toFixed(2)}<br>
                <strong>Clasificación:</strong> <span class="badge ${badgeClass}">${classification}</span><br>
                <strong>Descripción:</strong> ${description}
            </div>
        </div>
    `;
    document.getElementById('history').innerHTML = historyHTML;
}

function showAst2() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Distancias de Planetas</h2>
        </div>
        <div class="input-group">
            <label>Número de planetas a registrar:</label>
            <input type="number" id="numPlanets" min="1" max="20" value="5">
        </div>
        <button class="btn-primary" onclick="startPlanetRegistration()">Iniciar Registro</button>
        <div id="planetForm"></div>
        <div id="result"></div>
    `;
}

function startPlanetRegistration() {
    const num = parseInt(document.getElementById('numPlanets').value);
    if (isNaN(num) || num < 1) {
        alert('Por favor ingrese un número válido');
        return;
    }

    let formHTML = '<div class="result-box"><h3>Ingrese las distancias (millones de km)</h3>';
    for (let i = 1; i <= num; i++) {
        formHTML += `
            <div class="input-group">
                <label>Planeta ${i}:</label>
                <input type="number" id="planet${i}" step="0.1" placeholder="Distancia en millones de km">
            </div>
        `;
    }
    formHTML += '<button class="btn-primary" onclick="calculatePlanetStats()">Calcular Estadísticas</button></div>';
    document.getElementById('planetForm').innerHTML = formHTML;
}

function calculatePlanetStats() {
    const num = parseInt(document.getElementById('numPlanets').value);
    const distances = [];
    
    for (let i = 1; i <= num; i++) {
        const dist = parseFloat(document.getElementById(`planet${i}`).value);
        if (isNaN(dist)) {
            alert(`Por favor ingrese un valor válido para el Planeta ${i}`);
            return;
        }
        distances.push(dist);
    }

    const sum = distances.reduce((a, b) => a + b, 0);
    const avg = sum / distances.length;
    const max = Math.max(...distances);
    const min = Math.min(...distances);
    const median = [...distances].sort((a, b) => a - b)[Math.floor(distances.length / 2)];

    let tableHTML = '<table class="data-table"><tr><th>Planeta</th><th>Distancia (M km)</th></tr>';
    distances.forEach((d, i) => {
        tableHTML += `<tr><td>Planeta ${i + 1}</td><td>${d.toFixed(2)}</td></tr>`;
    });
    tableHTML += '</table>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Estadísticas Completas</h3>
            <div class="result-item">
                <strong>Promedio:</strong> ${avg.toFixed(2)} millones de km<br>
                <strong>Máximo:</strong> ${max.toFixed(2)} millones de km<br>
                <strong>Mínimo:</strong> ${min.toFixed(2)} millones de km<br>
                <strong>Mediana:</strong> ${median.toFixed(2)} millones de km<br>
                <strong>Rango:</strong> ${(max - min).toFixed(2)} millones de km
            </div>
            ${tableHTML}
        </div>
    `;
}

function showAst3() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Contador de Cráteres Lunares</h2>
        </div>
        <div class="input-group">
            <label>Diámetro del cráter (km) - Ingrese 0 para terminar:</label>
            <input type="number" id="craterDiameter" step="0.1">
        </div>
        <button class="btn-primary" onclick="addCrater()">Agregar Cráter</button>
        <button class="btn-secondary" onclick="finishCraters()">Finalizar</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addCrater() {
    const diameter = parseFloat(document.getElementById('craterDiameter').value);
    
    if (isNaN(diameter)) {
        alert('Por favor ingrese un valor válido');
        return;
    }

    if (diameter === 0) {
        finishCraters();
        return;
    }

    currentData.push(diameter);
    document.getElementById('craterDiameter').value = '';
    
    let resultHTML = '<div class="result-box"><h3>Cráteres Registrados</h3>';
    currentData.forEach((d, i) => {
        const category = d > 50 ? 'Grande (>50km)' : 'Pequeño (≤50km)';
        const badgeClass = d > 50 ? 'badge-danger' : 'badge-info';
        resultHTML += `<div class="history-item">
            <span>Cráter ${i + 1}: ${d.toFixed(2)} km</span>
            <span class="badge ${badgeClass}">${category}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function finishCraters() {
    const large = currentData.filter(d => d > 50).length;
    const small = currentData.filter(d => d <= 50).length;
    const avg = currentData.length > 0 ? currentData.reduce((a, b) => a + b, 0) / currentData.length : 0;

    document.getElementById('result').innerHTML += `
        <div class="result-box">
            <h3>Resumen Final</h3>
            <div class="result-item">
                <strong>Total de cráteres:</strong> ${currentData.length}<br>
                <strong>Cráteres grandes (>50 km):</strong> <span class="badge badge-danger">${large}</span><br>
                <strong>Cráteres pequeños (≤50 km):</strong> <span class="badge badge-info">${small}</span><br>
                <strong>Diámetro promedio:</strong> ${avg.toFixed(2)} km
            </div>
        </div>
    `;
}

function showAst4() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Identificador de Cuerpos Celestes</h2>
        </div>
        <div class="input-group">
            <label>Seleccione el tipo de cuerpo celeste:</label>
            <select id="celestialBody">
                <option value="1">1 - Estrella</option>
                <option value="2">2 - Planeta</option>
                <option value="3">3 - Cometa</option>
                <option value="4">4 - Asteroide</option>
                <option value="5">5 - Galaxia</option>
            </select>
        </div>
        <button class="btn-primary" onclick="identifyCelestialBody()">Identificar</button>
        <div id="result"></div>
    `;
}

function identifyCelestialBody() {
    const code = document.getElementById('celestialBody').value;
    let name, icon, description, characteristics;

    switch(code) {
        case "1":
            name = "Estrella";
            icon = "⭐";
            description = "Esfera de plasma que emite luz propia";
            characteristics = "Fusión nuclear, alta temperatura, brillo propio";
            break;
        case "2":
            name = "Planeta";
            icon = "🪐";
            description = "Cuerpo celeste que orbita una estrella";
            characteristics = "No emite luz propia, órbita definida, forma esférica";
            break;
        case "3":
            name = "Cometa";
            icon = "☄️";
            description = "Cuerpo helado con órbita excéntrica";
            characteristics = "Cola visible, núcleo helado, órbita elíptica";
            break;
        case "4":
            name = "Asteroide";
            icon = "🌑";
            description = "Cuerpo rocoso menor del sistema solar";
            characteristics = "Composición rocosa, órbita entre Marte y Júpiter";
            break;
        case "5":
            name = "Galaxia";
            icon = "🌌";
            description = "Sistema masivo de estrellas y materia";
            characteristics = "Miles de millones de estrellas, polvo cósmico, gas";
            break;
        default:
            name = "Desconocido";
            icon = "❓";
            description = "Código no reconocido";
            characteristics = "N/A";
    }

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>${icon} ${name}</h3>
            <div class="result-item">
                <strong>Tipo:</strong> ${name}<br>
                <strong>Descripción:</strong> ${description}<br>
                <strong>Características:</strong> ${characteristics}
            </div>
        </div>
    `;
}

function showAst5() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Registro de Niveles de Luz</h2>
        </div>
        <div class="input-group">
            <label>Nivel de luz (lux):</label>
            <input type="number" id="luxLevel" step="0.1">
        </div>
        <button class="btn-primary" onclick="addLuxReading()">Agregar Medición</button>
        <button class="btn-secondary" onclick="stopLuxReadings()">Detener</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addLuxReading() {
    const lux = parseFloat(document.getElementById('luxLevel').value);
    
    if (isNaN(lux)) {
        alert('Por favor ingrese un valor válido');
        return;
    }

    let classification, badgeClass;
    if (lux < 5) {
        classification = "Noche Profunda";
        badgeClass = "badge-danger";
    } else if (lux < 50) {
        classification = "Oscuridad";
        badgeClass = "badge-warning";
    } else if (lux < 500) {
        classification = "Iluminación Tenue";
        badgeClass = "badge-info";
    } else {
        classification = "Bien Iluminado";
        badgeClass = "badge-success";
    }

    currentData.push({lux, classification, time: new Date().toLocaleTimeString()});

    document.getElementById('luxLevel').value = '';
    
    let resultHTML = '<div class="result-box"><h3>Mediciones de Luz</h3>';
    currentData.forEach((item, i) => {
        resultHTML += `<div class="history-item">
            <span>${item.lux.toFixed(2)} lux - ${item.classification}</span>
            <span class="badge ${item.lux < 5 ? 'badge-danger' : item.lux < 50 ? 'badge-warning' : 'badge-info'}">${item.time}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function stopLuxReadings() {
    if (currentData.length === 0) {
        alert('No hay mediciones registradas');
        return;
    }

    const avg = currentData.reduce((sum, item) => sum + item.lux, 0) / currentData.length;
    const max = Math.max(...currentData.map(item => item.lux));
    const min = Math.min(...currentData.map(item => item.lux));
    const nightCount = currentData.filter(item => item.lux < 5).length;

    document.getElementById('result').innerHTML += `
        <div class="result-box">
            <h3>Estadísticas Finales</h3>
            <div class="result-item">
                <strong>Total mediciones:</strong> ${currentData.length}<br>
                <strong>Promedio:</strong> ${avg.toFixed(2)} lux<br>
                <strong>Máximo:</strong> ${max.toFixed(2)} lux<br>
                <strong>Mínimo:</strong> ${min.toFixed(2)} lux<br>
                <strong>Lecturas de "Noche Profunda":</strong> <span class="badge badge-danger">${nightCount}</span>
            </div>
        </div>
    `;
}

function showEnv1() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">🌫️ Calidad del Aire (AQI)</h2>
        </div>
        <div class="input-group">
            <label>Índice de Calidad del Aire (AQI):</label>
            <input type="number" id="aqiValue" min="0" max="500">
        </div>
        <button class="btn-primary" onclick="classifyAQI()">Clasificar</button>
        <button class="btn-secondary" onclick="clearHistory('env1')">Limpiar Historial</button>
        <div id="result"></div>
        <div id="history"></div>
    `;
}

function classifyAQI() {
    const aqi = parseInt(document.getElementById('aqiValue').value);
    if (isNaN(aqi) || aqi < 0) {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Por favor ingrese un valor válido (0-500)</div>';
        return;
    }

    let classification, badgeClass, healthAdvice, colorCode;
    
    if (aqi <= 50) {
        classification = "Bueno";
        badgeClass = "badge-success";
        healthAdvice = "Calidad del aire satisfactoria. Ideal para actividades al aire libre.";
        colorCode = "🟢";
    } else if (aqi <= 100) {
        classification = "Moderado";
        badgeClass = "badge-info";
        healthAdvice = "Aceptable para la mayoría. Grupos sensibles deben limitar actividad prolongada.";
        colorCode = "🟡";
    } else if (aqi <= 150) {
        classification = "Dañino para Grupos Sensibles";
        badgeClass = "badge-warning";
        healthAdvice = "Niños, ancianos y personas con problemas respiratorios deben reducir esfuerzo prolongado.";
        colorCode = "🟠";
    } else if (aqi <= 200) {
        classification = "Dañino";
        badgeClass = "badge-danger";
        healthAdvice = "Todos pueden experimentar efectos. Grupos sensibles eviten actividades al aire libre.";
        colorCode = "🔴";
    } else if (aqi <= 300) {
        classification = "Muy Dañino";
        badgeClass = "badge-danger";
        healthAdvice = "Alerta de salud. Todos deben evitar actividades al aire libre.";
        colorCode = "🟣";
    } else {
        classification = "Peligroso";
        badgeClass = "badge-danger";
        healthAdvice = "¡EMERGENCIA! Todos deben permanecer en interiores con ventanas cerradas.";
        colorCode = "🟤";
    }

    historyData.push({aqi, classification, time: new Date().toLocaleTimeString()});

    let historyHTML = '<div class="result-box"><h3>Historial de Mediciones</h3>';
    historyData.forEach((item, index) => {
        historyHTML += `<div class="history-item">
            <span>AQI: ${item.aqi} - ${item.classification}</span>
            <span>${item.time}</span>
        </div>`;
    });
    historyHTML += '</div>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Resultado</h3>
            <div class="result-item">
                <strong>${colorCode} AQI:</strong> ${aqi}<br>
                <strong>Clasificación:</strong> <span class="badge ${badgeClass}">${classification}</span><br>
                <strong>Recomendación:</strong> ${healthAdvice}
            </div>
        </div>
    `;
    document.getElementById('history').innerHTML = historyHTML;
}

function showEnv2() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">🔊 Niveles de Ruido Ambiental</h2>
        </div>
        <div class="input-group">
            <label>Número de mediciones:</label>
            <input type="number" id="numMeasurements" min="1" max="20" value="5">
        </div>
        <button class="btn-primary" onclick="startNoiseRegistration()">Iniciar Registro</button>
        <div id="noiseForm"></div>
        <div id="result"></div>
    `;
}

function startNoiseRegistration() {
    const num = parseInt(document.getElementById('numMeasurements').value);
    if (isNaN(num) || num < 1) {
        alert('Por favor ingrese un número válido');
        return;
    }

    let formHTML = '<div class="result-box"><h3>Ingrese los niveles de ruido (dB)</h3>';
    for (let i = 1; i <= num; i++) {
        formHTML += `
            <div class="input-group">
                <label>Medición ${i}:</label>
                <input type="number" id="noise${i}" step="0.1" placeholder="Decibeles (dB)">
            </div>
        `;
    }
    formHTML += '<button class="btn-primary" onclick="calculateNoiseStats()">Calcular Estadísticas</button></div>';
    document.getElementById('noiseForm').innerHTML = formHTML;
}

function calculateNoiseStats() {
    const num = parseInt(document.getElementById('numMeasurements').value);
    const noises = [];
    
    for (let i = 1; i <= num; i++) {
        const noise = parseFloat(document.getElementById(`noise${i}`).value);
        if (isNaN(noise)) {
            alert(`Por favor ingrese un valor válido para la Medición ${i}`);
            return;
        }
        noises.push(noise);
    }

    const sum = noises.reduce((a, b) => a + b, 0);
    const avg = sum / noises.length;
    const max = Math.max(...noises);
    const min = Math.min(...noises);

    let classification, badgeClass, description;
    if (avg < 40) {
        classification = "Silencioso";
        badgeClass = "badge-success";
        description = "Ambiente tranquilo, ideal para descanso";
    } else if (avg < 60) {
        classification = "Moderado";
        badgeClass = "badge-info";
        description = "Nivel normal de conversación";
    } else if (avg < 80) {
        classification = "Ruidoso";
        badgeClass = "badge-warning";
        description = "Puede causar molestia, afecta concentración";
    } else if (avg < 100) {
        classification = "Muy Ruidoso";
        badgeClass = "badge-danger";
        description = "¡Peligroso! Puede causar daño auditivo";
    } else {
        classification = "Extremadamente Peligroso";
        badgeClass = "badge-danger";
        description = "¡ALERTA! Daño auditivo inmediato";
    }

    let tableHTML = '<table class="data-table"><tr><th>Medición</th><th>Nivel (dB)</th><th>Clasificación</th></tr>';
    noises.forEach((n, i) => {
        let cat = n < 40 ? "Silencioso" : n < 60 ? "Moderado" : n < 80 ? "Ruidoso" : "Peligroso";
        tableHTML += `<tr><td>Medición ${i + 1}</td><td>${n.toFixed(1)} dB</td><td>${cat}</td></tr>`;
    });
    tableHTML += '</table>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Análisis de Ruido Ambiental</h3>
            <div class="result-item">
                <strong>Promedio:</strong> ${avg.toFixed(2)} dB<br>
                <strong>Clasificación:</strong> <span class="badge ${badgeClass}">${classification}</span><br>
                <strong>Máximo:</strong> ${max.toFixed(2)} dB<br>
                <strong>Mínimo:</strong> ${min.toFixed(2)} dB<br>
                <strong>Descripción:</strong> ${description}
            </div>
            ${tableHTML}
        </div>
    `;
}

function showEnv3() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Detector de Focos de Calor</h2>
        </div>
        <div class="input-group">
            <label>Temperatura (°C) - Ingrese 0 para terminar:</label>
            <input type="number" id="temperature" step="0.1">
        </div>
        <button class="btn-primary" onclick="addTemperature()">Agregar Temperatura</button>
        <button class="btn-secondary" onclick="finishTemperatures()">Finalizar</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addTemperature() {
    const temp = parseFloat(document.getElementById('temperature').value);
    
    if (isNaN(temp)) {
        alert('Por favor ingrese un valor válido');
        return;
    }

    if (temp === 0) {
        finishTemperatures();
        return;
    }

    currentData.push(temp);
    document.getElementById('temperature').value = '';
    
    let resultHTML = '<div class="result-box"><h3>🌡️ Temperaturas Registradas</h3>';
    currentData.forEach((t, i) => {
        let riskLevel, badgeClass;
        if (t > 45) {
            riskLevel = "ALTO RIESGO";
            badgeClass = "badge-danger";
        } else if (t > 35) {
            riskLevel = "Riesgo Moderado";
            badgeClass = "badge-warning";
        } else {
            riskLevel = "Normal";
            badgeClass = "badge-success";
        }
        
        resultHTML += `<div class="history-item">
            <span>Punto ${i + 1}: ${t.toFixed(1)}°C</span>
            <span class="badge ${badgeClass}">${riskLevel}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function finishTemperatures() {
    const hotspots = currentData.filter(t => t > 45).length;
    const moderate = currentData.filter(t => t > 35 && t <= 45).length;
    const normal = currentData.filter(t => t <= 35).length;
    const avg = currentData.length > 0 ? currentData.reduce((a, b) => a + b, 0) / currentData.length : 0;
    const max = currentData.length > 0 ? Math.max(...currentData) : 0;

    let alertLevel = hotspots > 0 ? "ALERTA ROJA" : moderate > 0 ? "PRECAUCIÓN" : "SEGURO";
    let alertClass = hotspots > 0 ? "alert-danger" : moderate > 0 ? "alert-warning" : "alert-success";

    document.getElementById('result').innerHTML += `
        <div class="alert ${alertClass}">
            <h3>${alertLevel}</h3>
        </div>
        <div class="result-box">
            <h3>Resumen de Análisis</h3>
            <div class="result-item">
                <strong>Total de puntos:</strong> ${currentData.length}<br>
                <strong>Focos de calor (>45°C):</strong> <span class="badge badge-danger">${hotspots}</span><br>
                <strong>Riesgo moderado (35-45°C):</strong> <span class="badge badge-warning">${moderate}</span><br>
                <strong>Normales (≤35°C):</strong> <span class="badge badge-success">${normal}</span><br>
                <strong>Temperatura promedio:</strong> ${avg.toFixed(2)}°C<br>
                <strong>Temperatura máxima:</strong> ${max.toFixed(2)}°C
            </div>
        </div>
    `;
}

function showEnv4() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Clasificación de Residuos</h2>
        </div>
        <div class="input-group">
            <label>Seleccione el tipo de residuo:</label>
            <select id="wasteType">
                <option value="1">1 - Orgánico</option>
                <option value="2">2 - Plástico</option>
                <option value="3">3 - Papel/Cartón</option>
                <option value="4">4 - Vidrio</option>
            </select>
        </div>
        <button class="btn-primary" onclick="classifyWaste()">Clasificar</button>
        <div id="result"></div>
    `;
}

function classifyWaste() {
    const code = document.getElementById('wasteType').value;
    let name, icon, color, description, examples, instructions;

    switch(code) {
        case "1":
            name = "Orgánico";
            icon = "🍎";
            color = "badge-success";
            description = "Residuos biodegradables de origen natural";
            examples = "Restos de comida, cáscaras de frutas, residuos de jardín";
            instructions = "Compostar o depositar en contenedor marrón. Se descompone naturalmente.";
            break;
        case "2":
            name = "Plástico";
            icon = "🥤";
            color = "badge-warning";
            description = "Materiales derivados del petróleo";
            examples = "Botellas PET, envases, bolsas, envoltorios";
            instructions = "Limpiar y depositar en contenedor amarillo. Reciclable en plantas especializadas.";
            break;
        case "3":
            name = "Papel/Cartón";
            icon = "📄";
            color = "badge-info";
            description = "Productos de celulosa";
            examples = "Periódicos, revistas, cajas, cuadernos";
            instructions = "Mantener seco y depositar en contenedor azul. Altamente reciclable.";
            break;
        case "4":
            name = "Vidrio";
            icon = "🍾";
            color = "badge-success";
            description = "Material inorgánico transparente";
            examples = "Botellas, frascos, cristalería";
            instructions = "Limpiar y depositar en contenedor verde. 100% reciclable infinitamente.";
            break;
        default:
            name = "Desconocido";
            icon = "❓";
            color = "badge-danger";
            description = "Tipo no identificado";
            examples = "N/A";
            instructions = "Consultar con autoridades locales";
    }

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>${icon} ${name}</h3>
            <div class="result-item">
                <strong>Tipo:</strong> <span class="badge ${color}">${name}</span><br>
                <strong>Descripción:</strong> ${description}<br>
                <strong>Ejemplos:</strong> ${examples}<br>
                <strong>Instrucciones de reciclaje:</strong> ${instructions}
            </div>
        </div>
    `;
}

function showEnv5() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">🌊 Monitoreo de Nivel del Río</h2>
        </div>
        <div class="input-group">
            <label>Nivel del río (metros):</label>
            <input type="number" id="riverLevel" step="0.1">
        </div>
        <button class="btn-primary" onclick="addRiverLevel()">Agregar Medición</button>
        <button class="btn-secondary" onclick="stopRiverMonitoring()">Detener Monitoreo</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addRiverLevel() {
    const level = parseFloat(document.getElementById('riverLevel').value);
    
    if (isNaN(level)) {
        alert('Por favor ingrese un valor válido');
        return;
    }

    let status, badgeClass, alert;
    if (level > 3) {
        status = "PELIGRO - Inundación";
        badgeClass = "badge-danger";
        alert = "🚨 ¡EVACUAR ZONA! Nivel crítico de inundación";
    } else if (level > 2.5) {
        status = "ALERTA ROJA";
        badgeClass = "badge-danger";
        alert = "⚠️ Prepararse para evacuación";
    } else if (level > 2) {
        status = "ALERTA AMARILLA";
        badgeClass = "badge-warning";
        alert = "⚠️ Monitorear constantemente";
    } else if (level > 1.5) {
        status = "Precaución";
        badgeClass = "badge-info";
        alert = "ℹ️ Nivel elevado pero controlado";
    } else {
        status = "Normal";
        badgeClass = "badge-success";
        alert = "✅ Nivel dentro de parámetros normales";
    }

    currentData.push({level, status, alert, time: new Date().toLocaleTimeString()});

    document.getElementById('riverLevel').value = '';
    
    let resultHTML = '<div class="result-box"><h3>Mediciones del Río</h3>';
    currentData.forEach((item, i) => {
        resultHTML += `<div class="history-item">
            <div>
                <strong>Medición ${i + 1}:</strong> ${item.level.toFixed(2)}m - ${item.status}<br>
                <small>${item.alert}</small>
            </div>
            <span>${item.time}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function stopRiverMonitoring() {
    if (currentData.length === 0) {
        alert('No hay mediciones registradas');
        return;
    }

    const avg = currentData.reduce((sum, item) => sum + item.level, 0) / currentData.length;
    const max = Math.max(...currentData.map(item => item.level));
    const min = Math.min(...currentData.map(item => item.level));
    const criticalCount = currentData.filter(item => item.level > 3).length;
    const trend = currentData[currentData.length - 1].level > currentData[0].level ? "Creciendo" : "Descendiendo";

    document.getElementById('result').innerHTML += `
        <div class="result-box">
            <h3>Resumen del Monitoreo</h3>
            <div class="result-item">
                <strong>Total mediciones:</strong> ${currentData.length}<br>
                <strong>Nivel promedio:</strong> ${avg.toFixed(2)} metros<br>
                <strong>Nivel máximo:</strong> ${max.toFixed(2)} metros<br>
                <strong>Nivel mínimo:</strong> ${min.toFixed(2)} metros<br>
                <strong>Mediciones críticas (>3m):</strong> <span class="badge badge-danger">${criticalCount}</span><br>
                <strong>Tendencia:</strong> ${trend}
            </div>
        </div>
    `;
}

function showHealth1() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Clasificación de Presión Arterial</h2>
        </div>
        <div class="input-group">
            <label>Presión Sistólica (mmHg):</label>
            <input type="number" id="systolic" min="0" placeholder="Ej: 120">
        </div>
        <div class="input-group">
            <label>Presión Diastólica (mmHg):</label>
            <input type="number" id="diastolic" min="0" placeholder="Ej: 80">
        </div>
        <button class="btn-primary" onclick="classifyBloodPressure()">Clasificar</button>
        <button class="btn-secondary" onclick="clearHistory('health1')">Limpiar Historial</button>
        <div id="result"></div>
        <div id="history"></div>
    `;
}

function classifyBloodPressure() {
    const sys = parseInt(document.getElementById('systolic').value);
    const dia = parseInt(document.getElementById('diastolic').value);
    
    if (isNaN(sys) || isNaN(dia) || sys < 0 || dia < 0) {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Por favor ingrese valores válidos</div>';
        return;
    }

    let classification, badgeClass, recommendation, icon;
    
    if (sys < 120 && dia < 80) {
        classification = "Normal";
        badgeClass = "badge-success";
        recommendation = "Mantener hábitos saludables. Control anual.";
        icon = "✅";
    } else if ((sys >= 120 && sys <= 129) && dia < 80) {
        classification = "Elevada";
        badgeClass = "badge-info";
        recommendation = "Adoptar cambios en estilo de vida. Control semestral.";
        icon = "ℹ️";
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
        classification = "HTA Grado 1";
        badgeClass = "badge-warning";
        recommendation = "Consultar con médico. Posible tratamiento. Control trimestral.";
        icon = "⚠️";
    } else if (sys >= 140 || dia >= 90) {
        classification = "HTA Grado 2";
        badgeClass = "badge-danger";
        recommendation = "¡Atención médica urgente! Tratamiento necesario. Control mensual.";
        icon = "🚨";
    } else {
        classification = "Indeterminado";
        badgeClass = "badge-secondary";
        recommendation = "Consultar con profesional médico.";
        icon = "❓";
    }

    historyData.push({sys, dia, classification, time: new Date().toLocaleTimeString()});

    let historyHTML = '<div class="result-box"><h3>Historial de Mediciones</h3>';
    historyData.forEach((item, index) => {
        historyHTML += `<div class="history-item">
            <span>${item.sys}/${item.dia} mmHg - ${item.classification}</span>
            <span>${item.time}</span>
        </div>`;
    });
    historyHTML += '</div>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Resultado</h3>
            <div class="result-item">
                <strong>${icon} Presión:</strong> ${sys}/${dia} mmHg<br>
                <strong>Clasificación:</strong> <span class="badge ${badgeClass}">${classification}</span><br>
                <strong>Recomendación:</strong> ${recommendation}
            </div>
        </div>
    `;
    document.getElementById('history').innerHTML = historyHTML;
}

function showHealth2() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">🌡️ Registro de Temperatura de Pacientes</h2>
        </div>
        <div class="input-group">
            <label>Número de pacientes:</label>
            <input type="number" id="numPatients" min="1" max="50" value="5">
        </div>
        <button class="btn-primary" onclick="startTempRegistration()">Iniciar Registro</button>
        <div id="tempForm"></div>
        <div id="result"></div>
    `;
}

function startTempRegistration() {
    const num = parseInt(document.getElementById('numPatients').value);
    if (isNaN(num) || num < 1) {
        alert('Por favor ingrese un número válido');
        return;
    }

    let formHTML = '<div class="result-box"><h3>Ingrese las temperaturas (°C)</h3>';
    for (let i = 1; i <= num; i++) {
        formHTML += `
            <div class="input-group">
                <label>Paciente ${i}:</label>
                <input type="number" id="temp${i}" step="0.1" placeholder="Temperatura en °C">
            </div>
        `;
    }
    formHTML += '<button class="btn-primary" onclick="analyzeTempStats()">Analizar</button></div>';
    document.getElementById('tempForm').innerHTML = formHTML;
}

function analyzeTempStats() {
    const num = parseInt(document.getElementById('numPatients').value);
    const temps = [];
    
    for (let i = 1; i <= num; i++) {
        const temp = parseFloat(document.getElementById(`temp${i}`).value);
        if (isNaN(temp)) {
            alert(`Por favor ingrese un valor válido para el Paciente ${i}`);
            return;
        }
        temps.push(temp);
    }

    const sum = temps.reduce((a, b) => a + b, 0);
    const avg = sum / temps.length;
    const max = Math.max(...temps);
    const min = Math.min(...temps);
    
    const fever = temps.filter(t => t >= 38).length;
    const highFever = temps.filter(t => t >= 39).length;
    const hypothermia = temps.filter(t => t < 35).length;
    const normal = temps.filter(t => t >= 36.5 && t < 37.5).length;

    let tableHTML = '<table class="data-table"><tr><th>Paciente</th><th>Temp (°C)</th><th>Estado</th></tr>';
    temps.forEach((t, i) => {
        let status = t < 35 ? "Hipotermia" : t < 36.5 ? "Baja" : t < 37.5 ? "Normal" : t < 38 ? "Febrícula" : t < 39 ? "Fiebre" : "Fiebre Alta";
        let statusClass = t < 35 ? "badge-info" : t < 36.5 ? "badge-warning" : t < 37.5 ? "badge-success" : t < 38 ? "badge-info" : "badge-danger";
        tableHTML += `<tr><td>Paciente ${i + 1}</td><td>${t.toFixed(1)}°C</td><td><span class="badge ${statusClass}">${status}</span></td></tr>`;
    });
    tableHTML += '</table>';

    document.getElementById('result').innerHTML = `
        <div class="result-box">
            <h3>Análisis de Temperatura</h3>
            <div class="result-item">
                <strong>Temperatura promedio:</strong> ${avg.toFixed(2)}°C<br>
                <strong>Temperatura máxima:</strong> ${max.toFixed(1)}°C<br>
                <strong>Temperatura mínima:</strong> ${min.toFixed(1)}°C<br><br>
                <strong>Pacientes normales:</strong> <span class="badge badge-success">${normal}</span><br>
                <strong>Con fiebre (≥38°C):</strong> <span class="badge badge-danger">${fever}</span><br>
                <strong>Fiebre alta (≥39°C):</strong> <span class="badge badge-danger">${highFever}</span><br>
                <strong>Hipotermia (<35°C):</strong> <span class="badge badge-info">${hypothermia}</span>
            </div>
            ${tableHTML}
        </div>
    `;
}

function showHealth3() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Contador de Pacientes con Fiebre</h2>
        </div>
        <div class="input-group">
            <label>Temperatura (°C) - Ingrese 0 para terminar:</label>
            <input type="number" id="patientTemp" step="0.1">
        </div>
        <button class="btn-primary" onclick="addPatientTemp()">Agregar Paciente</button>
        <button class="btn-secondary" onclick="finishPatientTemps()">Finalizar</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addPatientTemp() {
    const temp = parseFloat(document.getElementById('patientTemp').value);
    
    if (isNaN(temp)) {
        alert('Por favor ingrese un valor válido');
        return;
    }

    if (temp === 0) {
        finishPatientTemps();
        return;
    }

    currentData.push(temp);
    document.getElementById('patientTemp').value = '';
    
    let resultHTML = '<div class="result-box"><h3>🌡️ Temperaturas Registradas</h3>';
    currentData.forEach((t, i) => {
        let status, badgeClass;
        if (t >= 38) {
            status = t >= 39 ? "Fiebre Alta" : "Fiebre";
            badgeClass = "badge-danger";
        } else if (t >= 37.5) {
            status = "Febrícula";
            badgeClass = "badge-warning";
        } else if (t >= 36.5) {
            status = "Normal";
            badgeClass = "badge-success";
        } else {
            status = "Hipotermia";
            badgeClass = "badge-info";
        }
        
        resultHTML += `<div class="history-item">
            <span>Paciente ${i + 1}: ${t.toFixed(1)}°C</span>
            <span class="badge ${badgeClass}">${status}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function finishPatientTemps() {
    if (currentData.length === 0) {
        alert('No hay temperaturas registradas');
        return;
    }

    const feverCount = currentData.filter(t => t >= 38).length;
    const highFeverCount = currentData.filter(t => t >= 39).length;
    const normalCount = currentData.filter(t => t >= 36.5 && t < 37.5).length;
    const avg = currentData.reduce((a, b) => a + b, 0) / currentData.length;
    const max = Math.max(...currentData);

    let alertLevel = highFeverCount > 0 ? "ALERTA ALTA" : feverCount > 0 ? "ALERTA MEDIA" : "SITUACIÓN NORMAL";
    let alertClass = highFeverCount > 0 ? "alert-danger" : feverCount > 0 ? "alert-warning" : "alert-success";

    document.getElementById('result').innerHTML += `
        <div class="alert ${alertClass}">
            <h3>${alertLevel}</h3>
        </div>
        <div class="result-box">
            <h3>Resumen Epidemiológico</h3>
            <div class="result-item">
                <strong>Total de pacientes:</strong> ${currentData.length}<br>
                <strong>Con fiebre (≥38°C):</strong> <span class="badge badge-danger">${feverCount}</span> (${((feverCount/currentData.length)*100).toFixed(1)}%)<br>
                <strong>Fiebre alta (≥39°C):</strong> <span class="badge badge-danger">${highFeverCount}</span><br>
                <strong>Temperatura normal:</strong> <span class="badge badge-success">${normalCount}</span><br>
                <strong>Temperatura promedio:</strong> ${avg.toFixed(2)}°C<br>
                <strong>Temperatura máxima:</strong> ${max.toFixed(1)}°C
            </div>
        </div>
    `;
}

function showHealth4() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">Sistema de Clasificación TRIAGE</h2>
        </div>
        <div class="input-group">
            <label>Seleccione el nivel de urgencia:</label>
            <select id="triageCode">
                <option value="1">1 - Emergencia (Rojo)</option>
                <option value="2">2 - Urgente (Amarillo)</option>
                <option value="3">3 - Menos Urgente (Verde)</option>
                <option value="4">4 - No Urgente (Azul)</option>
            </select>
        </div>
        <button class="btn-primary" onclick="classifyTriage()">Clasificar</button>
        <div id="result"></div>
    `;
}

function classifyTriage() {
    const code = document.getElementById('triageCode').value;
    let category, icon, color, badgeClass, priority, waitTime, protocol, examples;

    switch(code) {
        case "1":
            category = "ROJO - Emergencia";
            icon = "🔴";
            color = "#dc3545";
            badgeClass = "badge-danger";
            priority = "MÁXIMA";
            waitTime = "INMEDIATO (0 minutos)";
            protocol = "Atención médica urgente. Riesgo vital inmediato.";
            examples = "Paro cardíaco, hemorragia severa, shock, trauma grave";
            break;
        case "2":
            category = "AMARILLO - Urgente";
            icon = "🟡";
            color = "#ffc107";
            badgeClass = "badge-warning";
            priority = "ALTA";
            waitTime = "15-30 minutos";
            protocol = "Atención prioritaria. Situación potencialmente grave.";
            examples = "Dolor torácico, fracturas, dificultad respiratoria moderada";
            break;
        case "3":
            category = "VERDE - Menos Urgente";
            icon = "🟢";
            color = "#28a745";
            badgeClass = "badge-success";
            priority = "MEDIA";
            waitTime = "60-120 minutos";
            protocol = "Atención necesaria pero sin riesgo inmediato.";
            examples = "Heridas menores, fiebre sin complicaciones, dolor leve";
            break;
        case "4":
            category = "AZUL - No Urgente";
            icon = "🔵";
            color = "#17a2b8";
            badgeClass = "badge-info";
            priority = "BAJA";
            waitTime = "2-4 horas";
            protocol = "Atención ambulatoria. Sin riesgo vital.";
            examples = "Consultas de rutina, síntomas crónicos estables";
            break;
        default:
            category = "DESCONOCIDO";
            icon = "❓";
            color = "#6c757d";
            badgeClass = "badge-secondary";
            priority = "N/A";
            waitTime = "N/A";
            protocol = "Código no válido";
            examples = "N/A";
    }

    document.getElementById('result').innerHTML = `
        <div class="result-box" style="border-left-color: ${color}">
            <h3>${icon} ${category}</h3>
            <div class="result-item">
                <strong>Categoría:</strong> <span class="badge ${badgeClass}">${category}</span><br>
                <strong>Prioridad:</strong> ${priority}<br>
                <strong>Tiempo de espera:</strong> ${waitTime}<br>
                <strong>Protocolo:</strong> ${protocol}<br>
                <strong>Ejemplos:</strong> ${examples}
            </div>
        </div>
    `;
}

function showHealth5() {
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title"> Monitoreo de Saturación de Oxígeno (SpO2)</h2>
        </div>
        <div class="input-group">
            <label>Saturación de Oxígeno (%):</label>
            <input type="number" id="spo2Level" min="0" max="100" step="1">
        </div>
        <button class="btn-primary" onclick="addSpo2Reading()">Agregar Medición</button>
        <button class="btn-secondary" onclick="stopSpo2Monitoring()">Detener Monitoreo</button>
        <div id="result"></div>
    `;
    currentData = [];
}

function addSpo2Reading() {
    const spo2 = parseFloat(document.getElementById('spo2Level').value);
    
    if (isNaN(spo2) || spo2 < 0 || spo2 > 100) {
        alert('Por favor ingrese un valor válido entre 0 y 100');
        return;
    }

    let status, badgeClass, action;
    if (spo2 >= 95) {
        status = "Normal";
        badgeClass = "badge-success";
        action = "Continuar monitoreo rutinario";
    } else if (spo2 >= 90) {
        status = "Hipoxemia Leve";
        badgeClass = "badge-warning";
        action = "Evaluar necesidad de oxígeno suplementario";
    } else if (spo2 >= 85) {
        status = "Hipoxemia Moderada";
        badgeClass = "badge-danger";
        action = "Administrar oxígeno. Evaluar causa";
    } else {
        status = "Hipoxemia Severa";
        badgeClass = "badge-danger";
        action = "URGENTE: Oxígeno inmediato. Posible ventilación";
    }

    currentData.push({spo2, status, action, time: new Date().toLocaleTimeString()});

    document.getElementById('spo2Level').value = '';
    
    let resultHTML = '<div class="result-box"><h3>Mediciones de SpO2</h3>';
    currentData.forEach((item, i) => {
        let badgeColor = item.spo2 >= 95 ? "badge-success" : item.spo2 >= 90 ? "badge-warning" : "badge-danger";
        resultHTML += `<div class="history-item">
            <div>
                <strong>Medición ${i + 1}:</strong> <span class="badge ${badgeColor}">${item.spo2}% SpO2</span> - ${item.status}<br>
                <small>${item.action}</small>
            </div>
            <span>${item.time}</span>
        </div>`;
    });
    resultHTML += '</div>';
    document.getElementById('result').innerHTML = resultHTML;
}

function stopSpo2Monitoring() {
    if (currentData.length === 0) {
        alert('No hay mediciones registradas');
        return;
    }

    const avg = currentData.reduce((sum, item) => sum + item.spo2, 0) / currentData.length;
    const max = Math.max(...currentData.map(item => item.spo2));
    const min = Math.min(...currentData.map(item => item.spo2));
    const criticalCount = currentData.filter(item => item.spo2 < 90).length;
    const normalCount = currentData.filter(item => item.spo2 >= 95).length;
    
    const firstHalf = currentData.slice(0, Math.floor(currentData.length/2));
    const secondHalf = currentData.slice(Math.floor(currentData.length/2));
    const firstAvg = firstHalf.reduce((sum, item) => sum + item.spo2, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, item) => sum + item.spo2, 0) / secondHalf.length;
    const trend = secondAvg > firstAvg ? "Mejorando" : secondAvg < firstAvg ? "Empeorando" : "Estable";

    let alertLevel = criticalCount > 0 ? " ALERTA CRÍTICA" : avg < 95 ? "VIGILANCIA" : "ESTABLE";
    let alertClass = criticalCount > 0 ? "alert-danger" : avg < 95 ? "alert-warning" : "alert-success";

    document.getElementById('result').innerHTML += `
        <div class="alert ${alertClass}">
            <h3>${alertLevel}</h3>
        </div>
        <div class="result-box">
            <h3>Resumen del Monitoreo</h3>
            <div class="result-item">
                <strong>Total mediciones:</strong> ${currentData.length}<br>
                <strong>SpO2 promedio:</strong> ${avg.toFixed(1)}%<br>
                <strong>SpO2 máximo:</strong> ${max}%<br>
                <strong>SpO2 mínimo:</strong> ${min}%<br>
                <strong>Mediciones críticas (<90%):</strong> <span class="badge badge-danger">${criticalCount}</span><br>
                <strong>Mediciones normales (≥95%):</strong> <span class="badge badge-success">${normalCount}</span><br>
                <strong>Tendencia:</strong> ${trend}
            </div>
        </div>
    `;
}

function clearHistory(exercise) {
    historyData = [];
    document.getElementById('history').innerHTML = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}