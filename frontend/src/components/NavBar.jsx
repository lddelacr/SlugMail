/**
 * Drawer/Appbar derived from (responsive drawer):
 * https://mui.com/material-ui/react-drawer/#main-content
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SharedContext from '../SharedContext';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

import {useNavigate} from 'react-router-dom';
const drawerWidth = 240;

/**
 * Search derived from 'App with a primary search field':
 * https://mui.com/material-ui/react-app-bar/#app-bar-with-search-field
 */
const Search = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': 'white',
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

/**
 * Creates the drawer
 * @return {*} drawer
 */
function ResponsiveDrawer() {
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();
  const {search, setSearch, setMailbox} = React.useContext(SharedContext);
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [saveOpen, setSaveOpen] = React.useState(false);

  const handleInputChange = (event) => {
    const toSearch = search;
    toSearch['searching'] = event.target.value;
    setSearch(toSearch);
    setActive(true);
  };

  const handleNewOpen = () => {
    setNewOpen(true);
  };

  const handleNewClose = () => {
    setNewOpen(false);
  };

  const handleClose = () => {
    setComposerOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    history('/login');
  };

  const composer = () => {
    setComposerOpen(true);
  };

  const inboxToggle = () => {
    setOpen(false);
    setMailbox('Inbox');
  };

  const sentToggle = () => {
    setOpen(false);
    setMailbox('Sent');
  };

  const trashToggle = () => {
    setOpen(false);
    setMailbox('Trash');
  };

  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
    setComposerOpen(false);
  };

  const closeSearch = () => {
    const toSearch = search;
    search['searching'] = '';
    setSearch(toSearch);
    const test = document.getElementById('searchbar').childNodes[1];
    test.childNodes[0].value = '';
    setActive(false);
    // console.log(search);
  };

  const clearSearch = () => {
    const toSearch = search;
    search['searching'] = '';
    setSearch(toSearch);
    const test = document.getElementById('searchbar').childNodes[1];
    test.childNodes[0].value = '';
  };

  if (active) {
    return (
      <div>
        <Box sx={{display: 'flex'}}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: {sm: `calc(100% - ${drawerWidth}px)`},
              ml: {sm: `${drawerWidth}px`},
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="close search"
                edge="start"
                onClick={closeSearch}
                sx={{mr: 2, display: {sm: 'none'}}}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Search onChange={handleInputChange}
                id ='searchbar'
                aria-label = 'searchbar'>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{'aria-label': 'search'}}
                />
              </Search>
              <Box sx={{flexGrow: 1}} />
              <IconButton
                size = "large"
                role = "button"
                aria-label = "clear search"
                onClick = {clearSearch}
                color="inherit">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }

  /**
   * Dialogs based off of:
   * https://mui.com/material-ui/react-dialog/#main-content
   */
  return (
    <div>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              role = "button"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Search onChange={handleInputChange}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </Search>
            <Box sx={{flexGrow: 1}} />
            <IconButton
              size = "large"
              role = "button"
              aria-label = "compose"
              onClick = {composer}
              color="inherit">
              <MailIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="current user"
              role="button"
              color="inherit"
              onClick={handleLogout}
            >
              <AccountCircle align="right"/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              'display': {xs: 'block', sm: 'none'},
              '& .MuiDrawer-paper': {boxSizing: 'border-box',
                width: drawerWidth},
            }}
          >
            <DrawerHeader>
              <b>Slug Mail</b>
            </DrawerHeader>
            <div>
              {/* <Toolbar /> */}
              <List>
                {['Inbox'].map((text) => (
                  <ListItem key={text} disablePadding
                    sx={{backgroundColor: 'rgb(230, 235, 233)'}}>
                    <ListItemButton
                      aria-label='Inbox'
                      onClick = {inboxToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                {['Starred'].map((text) => (
                  <ListItem key={text} disablePadding
                    sx={{backgroundColor: 'white'}}>
                    <ListItemButton>
                      <ListItemIcon>
                        {<StarIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {['Sent'].map((text) => (
                  <ListItem key={text} disablePadding
                    sx={{backgroundColor: 'white'}}>
                    <ListItemButton
                      aria-label='Sent'
                      onClick = {sentToggle}>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {['Drafts'].map((text) => (
                  <ListItem key={text} disablePadding
                    sx={{backgroundColor: 'white'}}>
                    <ListItemButton>
                      <ListItemIcon>
                        {<DraftsIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {['Trash'].map((text) => (
                  <ListItem key={text} disablePadding
                    sx={{backgroundColor: 'white'}}>
                    <ListItemButton
                      aria-label='Trash'
                      onClick = {trashToggle}>
                      <ListItemIcon>
                        {<DeleteIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                {['New Mailbox'].map((text) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      aria-label='New Mailbox'
                      onClick = {handleNewOpen}>
                      <ListItemIcon>
                        {<AddIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                {['Settings'].map((text) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {<SettingsIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              'display': {xs: 'none', sm: 'block'},
              '& .MuiDrawer-paper': {boxSizing: 'border-box',
                width: drawerWidth},
            }}
            open
          >
            <div>
              <Toolbar />
              <List>
                {['Inbox'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      aria-label='Inbox'
                      onClick = {inboxToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {['Sent'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      aria-label='Sent'
                      onClick = {sentToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {['Trash'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      aria-label='Trash'
                      onClick = {trashToggle}>
                      <ListItemIcon>
                        {<DeleteIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Box>
      </Box>
      <Dialog
        fullScreen
        open={composerOpen}
        onClose={handleSaveOpen}
      >
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleSaveOpen}
              aria-label="close composer"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              sx={{ml: 2, flex: 1}}
              variant="h6"
              component="div"
              align='right'>
              <IconButton
                color="inherit"
                onClick={handleClose}
                aria-label="send button"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <TextField
            name="toCompose"
            label="To"
            fullWidth
            autoFocus
            variant="standard"
          />
          <TextField
            name="subjectCompose"
            type="subjectCompose"
            fullWidth
            label="Subject"
            variant="standard"
          />
          <TextField
            margin='normal'
            id="outlined-multiline-static"
            label="Content"
            rows={27}
            multiline
            fullWidth
          />
        </List>
      </Dialog>
      <Dialog open={newOpen} onClose={handleNewClose}>
        <DialogTitle>Create A New Mailbox</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="mailbox name"
            label="Mailbox Name"
            type="mailbox name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewClose}>Cancel</Button>
          <Button onClick={handleNewClose} aria-label="create">Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={saveOpen}
        onClose={handleSaveClose}
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you wish to save your changes?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleSaveClose}>Cancel</Button>
          <Button aria-label='confirm save'
            onClick={handleSaveClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDrawer;
