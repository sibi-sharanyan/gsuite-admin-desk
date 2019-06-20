import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | createuser/organization', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:createuser/organization');
    assert.ok(route);
  });
});
