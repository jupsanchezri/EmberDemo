import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('scientists');
  this.route('datat');
  this.route('data');
  this.route('result');
});

export default Router;
