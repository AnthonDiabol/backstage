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

type action = {
  type: string;
  text: string;
  object: {};
};

// const initialState={title:"Jira Projects", project:{}, issue:{}};

const changeState = (
  state: {} = { title: 'Jira Projects', project: {}, issue: {} },
  action: action,
) => {
  switch (action.type) {
    case 'ADD_TITLE':
      return { ...state, title: action.text };
    case 'ADD_ISSUE':
      return { ...state, issue: action.object };
    case 'REMOVE_ISSUE':
      return { ...state, issue: {} };
    case 'ADD_PROJECT':
      return { ...state, project: action.object };
    case 'REMOVE_PROJECT':
      return { ...state, project: {} };
    default:
      return state;
  }
};

export default changeState;
