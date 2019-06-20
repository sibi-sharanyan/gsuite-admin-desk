import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('alluser');
  this.route('allgroup');
  this.route('createuser', function() {
    this.route('general');
    this.route('contact');
    this.route('organization');
  });
});

export default Router;
