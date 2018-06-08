import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pesoideal', function() {
    this.route('resultado');
  });
  this.route('data');
  this.route('result');
});

export default Router;
