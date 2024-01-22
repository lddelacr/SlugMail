import React from 'react';
import NavBar from './NavBar';
import MailList from './MailList';

import SharedContext from '../SharedContext';

/**
 * Based off of CSE186 Google Drive - Assignment 8 - Secret Sauce
 * https://drive.google.com/drive/folders/1dOrF0J3I5ajJTrjU6ejFhg_VW_uEeZsT
 * @return {*}
 */
function Home() {
  const [mailbox, setMailbox] = React.useState('Inbox');
  const [search, setSearch] = React.useState({searching: ''});

  return (
    <SharedContext.Provider value = {{mailbox, setMailbox, search, setSearch}}>
      <NavBar />
      <MailList />
    </SharedContext.Provider>
  );
}

export default Home;
