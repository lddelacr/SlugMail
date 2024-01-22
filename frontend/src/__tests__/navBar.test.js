import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import NavBar from '../components/NavBar';
import SharedContext from '../SharedContext';

const setMailbox = jest.fn();
const search = {searching: ''};
const setSearch = jest.fn();

/**
 * @param {number} width
 */
function setWidth(width) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
}
/** */
export function setNarrow() {
  setWidth(550);
}

/**
 */
test('App Renders', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
});

test('Toggle Drawer Clickable', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'toggle drawer'}));
});

test('Toggle Drawer Click Inbox', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'toggle drawer'}));
  await fireEvent.click(screen.getByRole('button', {name: 'Inbox'}));
});

test('Toggle Drawer Click Sent', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'toggle drawer'}));
  await fireEvent.click(screen.getByRole('button', {name: 'Sent'}));
});

test('Toggle Drawer Click Trash', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'toggle drawer'}));
  await fireEvent.click(screen.getByRole('button', {name: 'Trash'}));
});

test('Logout', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'current user'}));
});

test('Compose Button', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'compose'}));
  await fireEvent.click(screen.getByRole('button', {name: 'close composer'}));
  await fireEvent.click(screen.getByRole('button', {name: 'confirm save'}));
});

test('Compose Button and Send', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'compose'}));
  await fireEvent.click(screen.getByRole('button', {name: 'send button'}));
});

test('Toggle Drawer Click New Mailbox', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  setNarrow();
  await fireEvent.click(screen.getByRole('button', {name: 'toggle drawer'}));
  await fireEvent.click(screen.getByRole('button', {name: 'New Mailbox'}));
  await fireEvent.click(screen.getByRole('button', {name: 'create'}));
});

test('Searching', async () => {
  render(
    <BrowserRouter>
      <SharedContext.Provider value = {{search, setSearch, setMailbox}}>
        <NavBar />
      </SharedContext.Provider>
    </BrowserRouter>);
  window.alert = () => { };
  const searching = screen.getByLabelText('search');
  await userEvent.type(searching, 'Anna');
  await fireEvent.click(screen.getByRole('button', {name: 'clear search'}));
  await fireEvent.click(screen.getByRole('button', {name: 'close search'}));
});
