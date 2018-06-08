import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
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
});
