/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { device, element, waitFor, by, expect } from 'detox';

export const agreeToTermsAndConditions = async () => {
  if (device.getPlatform() === 'ios') {
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.text('OK')).tap();
  } else if (device.getPlatform() === 'android') {
    await waitFor(element(by.text('GOT IT')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.text('GOT IT')).tap();
  }
};

export const waitForStepNumber = async number => {
  await waitFor(element(by.id('test_status_label')))
    .toHaveText(`Test status: Step #${number}`)
    .withTimeout(10000);
};

export const waitForTestToFinish = async (timeInMs = 60000) => {
  await waitFor(element(by.id('test_status_label')))
    .toHaveText(`Test status: Finished`)
    .withTimeout(timeInMs);
};

export const expectSuccess = async () => {
  await expect(element(by.id('test_result_label'))).toHaveText(
    'Test result: Success'
  );
};

export const initializeIntegrationTestsPage = async () => {
  await device.launchApp({
    delete: true,
    permissions: { location: 'always' },
  });
  await element(by.id('integration_tests_button')).tap();
};

export const selectTestByName = async name => {
  await element(by.id('tests_menu_button')).tap();
  await element(by.id(name)).tap();
};
