# Calculo de masa corporal - Ember JS



## Requisitos

Se requieren las siguientes herramientas para reproducir el ejemplo.

* [Node.js](https://nodejs.org/) (con npm)
* [Ember CLI](https://ember-cli.com/)
* [IDE] (como Visual Code)

## Preparación del entorno

* `npm install -g ember-cli` Instalación de Ember js.
* `ember new [app-name]` nuevo proyecto [app-name]
* `cd [app-name]` Directorio de la aplicación.
* `ember install ember-bootstrap` Instalación de Bootstrap.

## Creación de vistas y controlador

Al empezar el proyecto existe la vista global denominada 'application.hbs', el cual es la estructura base de las demás vistas que se creen.

Para este ejemplo se crearán dos vistas más, para ello se crea la ruta con los siguientes comandos (al generar una ruta, esta se agrega al router del sistema 'router.js', se crea el archivo Route dentro de la carpeta 'routes' y se crea la vista dentro de la carpeta 'templates').

* `ember generate route pesoideal`  vista /pesoideal
* `ember generate route pesoideal/resultado` vista /pesoideal/resultado
* `ember generate controller pesoideal/resultado` controlador para la vista resultado

## Controladores

### resultado.js

En el controlador de resultado va estar toda la lógica para calcular el IMC y todas sus demás variables relacionadas.

* Por medio de 'queryParams' recibimos los datos como género, altura y peso para calcular el IMC.
* En actions está la función que calcula las variables deseadas de acuerdo a los parámetros de entrada.
* Se usa 'computed' como el inicializador para generar los datos finales para mostrar al usuario, con ayuda de los parámetros de entrada y la función de cálculo generada.

Agregar el siguiente import para que se reconozca 'computed'
* `import { computed } from '@ember/object';`

```
queryParams: ['gender', 'height', 'age', 'weight'],
gender: null,
height: null,
age: null,
weight: null,
BMICalculated: null,
BMI: computed('BMICalculated', function () {
    let obj = {
        height: this.get('height'),
        weight: this.get('weight'),
        age: this.get('age'),
        sex: this.get('gender')
	};
    
    this.send('calcBMI', obj);
    return this.get('BMICalculated');
}),
actions: {
    calcBMI(obj) {
        let PIdevine, PIrobinson, PImiller, PIhamwi, PIprueba, lbm, Watson, Hume;
        
        var Ht = obj.height;
        var Wt = obj.weight;
        var Age = obj.age;
        var Sex = obj.sex;
    
        let meters = Ht / 100;
        let imc = Wt / (meters * meters);
        imc = Math.round(imc * 100) / 100;
    
        if (Sex == "1") {
            PIdevine = ((Ht - 152.4) * (0.91) + 50);
    
            PIrobinson = ((Ht - 152.4) * (0.748) + 52);
    
            PImiller = ((Ht - 152.4) * (0.555) + 56.2);
    
            PIhamwi = ((Ht - 152.4) * (1.063) + 48.2);
    
            PIprueba = (22 * ((Ht / 100) * (Ht / 100)));
            lbm = (Wt * 1.10) - ((128 * ((Wt / Ht) * (Wt / Ht))));
            Watson = 2.447 - (0.09156 * Age) + (0.1074 * Ht) + (0.3362 * Wt);
            Hume = (0.194786 * Ht) + (0.296785 * Wt) - 14.012934;
		}
    
        if (Sex == "2") {
            PIdevine = ((Ht - 152.4) * (0.91) + 45.5);
    
            PIrobinson = ((Ht - 152.4) * (0.669) + 49);
    
            PImiller = ((Ht - 152.4) * (0.5354) + 53.1);
    
            PIhamwi = ((Ht - 152.4) * (0.866) + 45.5);
    
            PIprueba = (22 * ((Ht / 100) * (Ht / 100)));
            lbm = (Wt * 1.07) - ((148 * ((Wt / Ht) * (Wt / Ht))));
            Watson = -2.097 + (0.1069 * Ht) + (0.2466 * Wt);
            Hume = (0.34454 * Ht) + (0.183809 * Wt) - 35.270121;
		}
    
        let tbw = (Hume + Watson) / 2;
        let PI = (PIdevine + PIrobinson + PImiller + PIhamwi + PIprueba) / 5;
        PI = Math.round(PI * 100) / 100;

        let PIPorc = (Wt / PI) * (100);
        PIPorc = Math.round(PIPorc * 100) / 100;
    
        let bsa = Math.pow(Wt,
		0.425) * Math.pow(Ht,
		0.725) * 0.007184;
        bsa = Math.round(bsa * 1000) / 1000;
    
        lbm = Math.round(lbm * 100) / 100;
        tbw = Math.round(tbw * 10) / 10;
    
        const result = {
            pi: PI,
            piPorc: PIPorc,
            imc: imc,
            bsa: bsa,
            lbm: lbm,
            tbw: tbw
		};

    	this.set('BMICalculated', result);
	}
}
```

## Templates

### application.hbs
```
<h1 class="text-center">Cálculo de sobrepeso - IMC</h1>
<div class="container">
  <div class="row">
    <div class="col col-md-4">
        <img src="/images/skylight.png" alt="" width="100%">
        <p>El índice de masa corporal o IMC es el resultado de un cálculo entre el peso y la altura, permite determinar la corpulencia y el impacto que ésta puede tener en la salud.</p>
        <p>El índice de masa corporal es una herramienta que han inventado los médicos para evaluar los riesgos para la salud asociados al sobrepeso.</p>
    </div>
    <div class="col col-md-8">
        {{outlet}}
    </div>
  </div>
</div>
```

### pesoideal.hbs
```
<form action="/pesoideal/resultado" method="GET">
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="radio" id="genero_hombre" name="gender" class="form-check-input" value="1" required>
            <label class="form-check-label" for="genero_hombre">Hombre</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="radio" id="genero_mujer" name="gender" class="form-check-input" value="2" required>
            <label class="form-check-label" for="genero_mujer">Mujer</label>
        </div>
    </div>
    <div class="form-group">
        <label for="altura">Altura (cm)</label>
        <input type="number" class="form-control" id="altura" name="height" placeholder="altura" min="0" required>
    </div>
    <div class="form-group">
        <label for="edad">Edad</label>
        <input type="number" class="form-control" id="edad" name="age" placeholder="edad" min="0" required>
    </div>
    <div class="form-group">
        <label for="peso">Peso (kg)</label>
        <input type="number" class="form-control" id="peso" name="weight" placeholder="peso" min="0" required>
    </div>
    <button type="submit" class="btn btn-primary">Calcular</button>
</form>

{{outlet}}
```

### resultado.hbs

La variable 'BMI' usada en la vista es la calculada en el controlador 'resultado.js'.
```
<hr>
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Valor</th>
            <th scope="col">Descripción</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>PI</td>
            <td>{{BMI.pi}} Kg</td>
            <td>Peso Ideal</td>
        </tr>
        <tr>
            <td>PIPorc</td>
            <td>{{BMI.piPorc}} %</td>
            <td>Porcentaje de PI</td>
        </tr>
        <tr>
            <td>IMC</td>
            <td>{{BMI.imc}} Kg/m²</td>
            <td>Indice de Masa Corporal</td>
        </tr>
        <tr>
            <td>BSA</td>
            <td>{{BMI.bsa}} m²</td>
            <td>Área de Superficie Corporal</td>
        </tr>
        <tr>
            <td>LBM</td>
            <td>{{BMI.lbm}} Kg</td>
            <td>Masa Corporal Magra </td>
        </tr>
        <tr>
            <td>TBW</td>
            <td>{{BMI.tbw}} litros</td>
            <td>Agua Corporal Total</td>
        </tr>
    </tbody>
</table>
```

## Componente alert

Con lo anterior realizado logramos ingresar datos, pasarlos a una nueva vista, tomarlos y calcular las variables deseadas para mostrar en una tabla.

Ahora se creará un mensaje alerta para mostrar al usuario en palabras textuales (No cifras) el estado de su peso.

Para ello se creará un componente llamado 'imc-alert', al cual se le envíe el IMC, y de acuerdo a este pueda determinar y mostrar un mensaje con el estado de la persona.

* `ember generate component imc-alert`

Al crear un componente se genera la vista (/template/components/imc-alert.hbs) y su controlador (/componentes/imc-alert.js)

### imc-alert.js
* En 'model()' se guarda los diferentes mensajes que puede tener de acuerdo al IMC (dato de entrada)
* En 'alert' se escoge la alert de la lista de alerts (model()) de acuerdo al IMC
* Se importa `import { computed } from '@ember/object';`
```
model() {
    return [
        { min: 0, max: 16, message: 'Desnutrición severa', type: 'danger' },
        { min: 16, max: 17, message: 'Desnutrición moderada', type: 'danger' },
        { min: 17, max: 18.5, message: 'Desnutrición ligera', type: 'danger' },
        { min: 18.5, max: 24.91, message: '¡¡ Peso Normal !!', type: 'success' },
        { min: 24.91, max: 26.91, message: 'Sobrepeso grado I', type: 'danger' },
        { min: 26.9, max: 29.91, message: 'Sobrepeso grado II (preobesidad) ', type: 'danger' },
        { min: 29.91, max: 34.6, message: 'Obesidad: tipo I', type: 'danger' },
        { min: 34.6, max: 39.91, message: 'Obesidad: tipo II', type: 'danger' },
        { min: 39.91, max: 49.91, message: 'Obesidad: tipo III (Mórbida)', type: 'danger' },
        { min: 49.91, max: 150, message: 'Obesidad: tipo IV (Extrema)', type: 'danger' }
    ];
},
alert: computed('model', function(){
    const limits = this.get('model')();
    const imc = this.get('imc'); 
    for (let i = 0; i < limits.length; i++) {
        let limit = limits[i];
        if(imc >= limit.min && imc < limit.max) {
            return limit;
        }
    }
    return limits.slice(-1)[0];
})
```

### imc-alert.hbs

'alert' es la variable que se calculó en el controlador 'imc-alert.js'.
```
<div class="alert alert-{{ alert.type }}" role="alert"> 
    {{ alert.message }}
</div>
```

### resultado.hbs

Para usar este component solo es referenciarlo en la vista que se desee implementar y mandarle el parámetro requerido 'IMC'.

Agregar la siguiente linea al final de la vista de resultado.
```
{{imc-alert imc=BMI.imc}}
```

## Running / Development

* `ember serve`
* Visita tu app en [http://localhost:4200](http://localhost:4200).
* Cuando se creo las rutas el formulario se hizo en la vista de 'pesoideal.hbs', por ende, se accede desde [http://localhost:4200/pesoideal/](http://localhost:4200/pesoideal/).