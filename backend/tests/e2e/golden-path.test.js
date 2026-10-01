import test from 'node:test';

test('golden path E2E', {skip: !process.env.RUN_E2E}, async () => {
  // Set RUN_E2E=true only in a controlled environment with a seeded MongoDB/Redis deployment.
  // The canonical workflow is documented in docs/testing/golden-path.md.
});
