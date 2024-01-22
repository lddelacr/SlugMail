import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';
import Home from '../components/Home';
import {BrowserRouter} from 'react-router-dom';
import NotFound from '../components/NotFound';

const molly = {
  name: 'Molly Member',
  accessToken: 'some-old-jwt',
};

test('Home Renders', async () => {
  localStorage.setItem('user', JSON.stringify(molly));
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
});

test('App Renders with User', async () => {
  localStorage.setItem('user', JSON.stringify(molly));
  render(<App />);
});

test('App Renders Remove User', async () => {
  localStorage.removeItem('user');
  render(<App />);
});

test('Not Found Renders', async () => {
  localStorage.setItem('user', JSON.stringify(molly));
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>);
  fireEvent.click(screen.getByText('GO HOME'));
});
