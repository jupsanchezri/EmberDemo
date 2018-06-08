import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['genero', 'altura', 'edad', 'peso'],
    genero: null,
    altura: null,
    edad: null,
    peso: null,

    filteredArticles: Ember.computed('altura', function () {
        let genero = this.get('genero');
        let altura = this.get('altura');
        let edad = this.get('edad');
        let peso = this.get('peso');

        return '123123123';
    })
});