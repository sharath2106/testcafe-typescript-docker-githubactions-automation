import { Selector, t } from 'testcafe';

fixture`Testing the testcafe`.page('https://www.automationpractice.com');

test('Test', async (t) => {
  t.expect(true).eql(true);
});
