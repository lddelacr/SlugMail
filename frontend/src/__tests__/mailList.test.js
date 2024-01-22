/**
 * Based from CSE 186 Google Slides - Assignment 8 - More Secret Sauce
 * https://drive.google.com/drive/folders/1dOrF0J3I5ajJTrjU6ejFhg_VW_uEeZsT
 */
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import MailList from '../components/MailList';
import SharedContext from '../SharedContext';

const molly = {
  name: 'Molly Member',
  accessToken: 'some-old-jwt',
};

const subjects = ['Subject',
  'Some Other Subject', 'Trash Subject', 'Other Subject'];

const inbox = [{
  'mailbox': 'inbox',
  'mail': [{
    'from': {
      'name': 'Professor',
      'email': 'professor@example.com',
    },
    'subject': subjects[0],
    'received': 'Goodbye',
    'id': 'asldkjaskdjaskldj',
    'content': 'asdfasdfsadfsdaf',
  },
  {
    'from': {
      'name': 'Harrison',
      'email': 'professor@example.com',
    },
    'subject': subjects[1],
    'received': '2020-11-17T23:17:19Z',
    'id': 'asldkjaskdjasasdfkldj',
    'content': 'asdfasdfsadfsdafsdfgsdfgdsfgkjldfgjkldfsjlgjkldfgjldfsjklgjk',
  },
  {
    'from': {
      'name': 'Harrison',
      'email': 'professor@example.com',
    },
    'subject': subjects[2],
    'received': '2020-11-17T23:17:19Z',
    'id': 'asldkjaskdjasasdasdasdfkldj',
    'content': 'asdfasdfsadfsdafsdfgsdfgdsfgkjldfgjkldfsjlgjkldfgjldfsjklgjk',
  },
  {
    'from': {
      'name': 'Harrison',
      'email': 'professor@example.com',
    },
    'subject': subjects[3],
    'received': '2020-11-17T23:17:19Z',
    'id': 'asldkjaskdjasasdafsdfsdasdasdfkldj',
    'content': 'asdfasdfsadfsdafsdfgsdfgdsfgkjldfgjkldfsjlgjkldfgjldfsjklgjk',
  },
  ],
}];

// const trash = [{
//   id: '',
//   subject: subjects[2],
// }];

let box = undefined;
const URL = 'http://localhost:3010/v0/mail';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return box ? res(ctx.json(box)) :
      res(ctx.status(404, 'Unknown mailbox'));
  }),
);

beforeAll(() => {
  localStorage.setItem('user', JSON.stringify(molly));
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Unknown Mailbox', async () => {
  const mailbox = 'Unknown';
  box = undefined;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
});

test('Inbox has mail', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
});

test('Click on Inbox Mail', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(subjects[0]));
});

test('Open and Close Inbox Mail', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(subjects[0]));
  await fireEvent.click(screen.getByRole('button',
    {name: 'close mobile reader'}));
});

test('Open and Close Inbox Mail From Name', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(inbox[0].mail[0].from.name));
  await fireEvent.click(screen.getByRole('button',
    {name: 'close mobile reader'}));
});

test('Open Mail from Row', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(inbox[0].mail[0].from.name));
  await fireEvent.click(screen.getByLabelText(inbox[0].mail[0].id));
});

test('Open Mail from Blank', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(inbox[0].mail[0].from.name));
  await fireEvent.click(screen.getByLabelText(inbox[0].mail[0].id +
    inbox[0].mail[0].from.name));
  await fireEvent.click(screen.getByRole('button', {name: 'reply'}));
  await fireEvent.click(screen.getByRole('button', {name: 'close replier'}));
});

test('Click on Star', async () => {
  const mailbox = 'Inbox';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
  await fireEvent.click(screen.getByText(inbox[0].mail[0].from.name));
  await fireEvent.click(screen.getAllByLabelText('star icon')[0]);
});

test('Trash has mail', async () => {
  const mailbox = 'Trash';
  box = inbox;
  render(
    <SharedContext.Provider value = {{mailbox}}>
      <MailList />
    </SharedContext.Provider>,
  );
  await screen.findByText(subjects[0]);
});
