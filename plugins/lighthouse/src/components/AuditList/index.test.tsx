/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import fs from 'fs';
import path from 'path';
import mockFetch from 'jest-fetch-mock';
import { render, waitForElement } from '@testing-library/react';
import { ApiRegistry, ApiProvider } from '@backstage/core';
import { wrapInThemedTestApp } from '@backstage/test-utils';

import { lighthouseApiRef, LighthouseRestApi } from '../../api';
import AuditList from '.';

const websiteListJson = fs
  .readFileSync(
    path.join(__dirname, '../../__fixtures__/website-list-response.json'),
  )
  .toString();

describe('AuditList', () => {
  let apis: ApiRegistry;

  beforeEach(() => {
    apis = ApiRegistry.from([
      [lighthouseApiRef, new LighthouseRestApi('http://lighthouse')],
    ]);
  });

  it.todo('renders a link to create a new audit');

  describe('when waiting on the request', () => {
    it('should render the loader', async () => {
      mockFetch.mockResponse(() => new Promise(() => {}));
      const rendered = render(
        wrapInThemedTestApp(
          <ApiProvider apis={apis}>
            <AuditList />
          </ApiProvider>,
        ),
      );
      const element = await waitForElement(() =>
        rendered.findByTestId('progress'),
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('when the audits load', () => {
    it('should render the table', async () => {
      mockFetch.mockOnce(websiteListJson);
      const rendered = render(
        wrapInThemedTestApp(
          <ApiProvider apis={apis}>
            <AuditList />
          </ApiProvider>,
        ),
      );
      const element = await waitForElement(() =>
        rendered.findByText('https://anchor.fm'),
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('when the audits fail', () => {
    it('should render an error', async () => {
      mockFetch.mockRejectOnce(new Error('failed to fetch'));
      const rendered = render(
        wrapInThemedTestApp(
          <ApiProvider apis={apis}>
            <AuditList />
          </ApiProvider>,
        ),
      );
      const element = await waitForElement(() =>
        rendered.findByTestId('error-message'),
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    describe('when only one page is needed', () => {
      it.todo('hides pagination elements');
    });

    describe('when multiple pages are needed', () => {
      it.todo('shows pagination elements');
      it.todo('correclty selects the current page based on the response');
      it.todo(
        'correctly requests the right limit and offset based on the url param',
      );
    });
  });
});
