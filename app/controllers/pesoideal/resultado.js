import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
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
        
            let bsa = Math.pow(Wt, 0.425) * Math.pow(Ht, 0.725) * 0.007184;
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
});