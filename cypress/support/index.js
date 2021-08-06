// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import addContext from 'mochawesome/addContext';
require('cypress-grep')()

Cypress.on('test:after:run', (test, runnable) => {
  // Extract tags from the test
  const testTags = test._testConfig ? test._testConfig.tags.join(", ") : 'No Tags';
  
  // Cleanup title if it has a do in the end
  const title = test.title.charAt(test.title.length - 1) === '.' ? test.title.slice(0, -1) : test.title;

  // Modifing the title of the test in the mochawesome report
  test.title = `${title} -- [ ${testTags} ]`;

  // Adding tests tags to the context
  addContext({ test }, `Cypress Tags: [ ${testTags} ]`);

  if (test.state === 'failed') {
    const specName = Cypress.spec.name;
    const screenshot = `${Cypress.config('screenshotsFolder')}/${specName}/${runnable.parent.title} -- ${title} (failed).png`;
    const video = `${Cypress.config('videosFolder')}/${specName}.mp4`;

    addContext({ test }, screenshot);
    addContext({ test }, video);
  }
});
