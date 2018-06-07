import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | datat', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:datat');
    assert.ok(route);
  });
});
