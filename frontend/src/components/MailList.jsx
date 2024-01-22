/**
 * Dialog based off of full screen dialog of:
 * https://mui.com/material-ui/react-dialog/#main-content
 */

import {ListItem, ListItemText} from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import SharedContext from '../SharedContext';
import {Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import Slide from '@mui/material/Slide';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Based from CSE 186 Google Slides - Assignment 8 - More Secret Sauce
 * https://drive.google.com/drive/folders/1dOrF0J3I5ajJTrjU6ejFhg_VW_uEeZsT
 * @param {*} mailbox
 * @param {*} setMails
 */
const fetchBooks = (mailbox, setMails) => {
  const item = JSON.parse(localStorage.getItem('user'));

  fetch('http://localhost:3010/v0/mail?mailbox=' + mailbox.toLowerCase(), {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${item.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setMails(json);
    })
    .catch((error) => {
      // console.log(error);
      setMails([]);
    });
};

/**
 *
 * @return {*}
 */
function MailList() {
  const [mail, setMails] = React.useState([]);
  const {mailbox} = React.useContext(SharedContext);
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [replyOpen, setReplyOpen] = React.useState(false);

  const handleReplyClose = () => {
    setOpen(false);
    setReplyOpen(false);
  };

  const replier = () => {
    setReplyOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    let currEmail = mail[0].mail.find((o) => o.id ===
     e.target.parentNode.parentNode.id);
    if (!currEmail) {
      currEmail = mail[0].mail.find((o) => o.id ===
     e.target.parentNode.parentNode.parentNode.id);
    }

    if (!currEmail) {
      currEmail = mail[0].mail.find((o) => o.id ===
     e.target.id);
    }
    if (!currEmail) {
      currEmail = mail[0].mail.find((o) => o.id ===
      e.target.parentNode.id);
    }

    if (currEmail) {
      setContent(getContent(currEmail, mailbox, replier));
      setOpen(true);
    }
  };

  React.useEffect(() => {
    fetchBooks(mailbox, setMails);
  }, [mailbox]);

  if (mail.length !== 0) {
    mail[0].mail.sort(function(a, b) {
      const c = new Date(a.received);
      const d = new Date(b.received);
      return d-c;
    });

    if (mailbox === 'Inbox') {
      const tempDate = new Date();
      tempDate.setHours(10, 27);
      mail[0].mail[0].received = tempDate.toISOString();
      tempDate.setDate(tempDate.getDate() - 1);
      mail[0].mail[1].received = tempDate.toISOString();

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      mail[0].mail[2].received = lastMonth.toISOString();

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      for (let i = 0; i < mail[0].mail.length; i++) {
        const today = new Date();
        const emailDate = new Date(mail[0].mail[i].received);
        let monthDiff = today.getMonth() - emailDate.getMonth();
        const yearDiff = (today.getFullYear() - emailDate.getFullYear()) * 12;
        monthDiff = monthDiff + yearDiff;

        // console.log(emailDate, today);
        // console.log(monthDiff);

        if (emailDate.getDate() === today.getDate() &&
      emailDate.getFullYear() === today.getFullYear() &&
      emailDate.getMonth() === today.getMonth()) {
          mail[0].mail[i].display = emailDate.getHours() +
         ':' + emailDate.getMinutes() + ' AM';
        } else if (emailDate.getDate() === tempDate.getDate() &&
      emailDate.getFullYear() === tempDate.getFullYear() &&
      emailDate.getMonth() === tempDate.getMonth()) {
          mail[0].mail[i].display = 'Yesterday';
        } else if (monthDiff < 12) {
          mail[0].mail[i].display =
        months[emailDate.getMonth()] + ' ' + emailDate.getDate();
        } else {
          mail[0].mail[i].display = emailDate.getFullYear();
        }

        if (mail[0].mail[i].content.length > 43) {
          mail[0].mail[i].preview =
       mail[0].mail[i].content.substring(0, 40) + '...';
        } else {
          mail[0].mail[i].preview = mail[0].mail[i].content;
        }
      }
    } else {
      const tempDate = new Date();
      tempDate.setHours(11, 30);
      mail[0].mail[0].received = tempDate.toISOString();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 4);
      mail[0].mail[1].received = lastMonth.toISOString();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      for (let i = 0; i < mail[0].mail.length; i++) {
        const today = new Date();
        const emailDate = new Date(mail[0].mail[i].received);
        let monthDiff = today.getMonth() - emailDate.getMonth();
        const yearDiff = (today.getFullYear() - emailDate.getFullYear()) * 12;
        monthDiff = monthDiff + yearDiff;

        // console.log(emailDate, today);
        // console.log(monthDiff);

        if (emailDate.getDate() === today.getDate() &&
      emailDate.getFullYear() === today.getFullYear() &&
      emailDate.getMonth() === today.getMonth()) {
          mail[0].mail[i].display = emailDate.getHours() +
         ':' + emailDate.getMinutes() + ' AM';
        } else if (monthDiff < 12) {
          mail[0].mail[i].display =
        months[emailDate.getMonth()] + ' ' + emailDate.getDate();
        } else {
          mail[0].mail[i].display = emailDate.getFullYear();
        }

        if (mail[0].mail[i].content.length > 43) {
          mail[0].mail[i].preview =
       mail[0].mail[i].content.substring(0, 40) + '...';
        } else {
          mail[0].mail[i].preview = mail[0].mail[i].content;
        }
      }
    }
    // console.log(mail[0].mail[2].received);


    const rows = [];
    /**
     * Based on Align list items from:
     * https://mui.com/material-ui/react-list/#main-content
     */
    for (let i = 0; i < mail[0].mail.length; i++) {
      const cells = [];
      cells.push(<ListItemAvatar
        key = {'avatar' + i + mail[0].mail[i].from.name[0]}>
        <Avatar key = {'avatar' + mail[0].mail[i].from.name[0] + i}>
          {mail[0].mail[i].from.name[0]}</Avatar>
      </ListItemAvatar>);
      cells.push(<ListItemText
        key = {mail[0].mail[i].id + mail[0].mail[i].from.name}
        aria-label = {mail[0].mail[i].id + mail[0].mail[i].from.name}
        primary={
          <Typography
            sx={{display: 'inline', fontWeight: 'bold'}}
            component="span"
            color="black"
          >
            {mail[0].mail[i].from.name}
          </Typography>
        }
        secondaryTypographyProps={{color: 'black'}}
        secondary={
          <React.Fragment key = {i + mail[0].mail[i].subject}>
            <Typography
              sx={{display: 'inline', fontWeight: 'bold'}}
              component="span"
              variant='body2'
              color="black"
            >
              {mail[0].mail[i].subject}
            </Typography>
            <br />
            <Typography
              component="span"
              color="black"
              variant='body2'
            >
              {mail[0].mail[i].preview}
            </Typography>
          </React.Fragment>
        }
      />);
      cells.push(<ListItemText
        key = {mail[0].mail[i].id + mail[0].mail[i].received}
        align='right'
        primary={mail[0].mail[i].display}
        secondary={
          <IconButton
            aria-label="star"
            role='button'>
            <StarBorderIcon aria-label="star icon"/>
          </IconButton>
        }/>);

      const rowLabel = mail[0].mail[i].id;
      rows.push(<ListItem key = {rowLabel}
        aria-label = {rowLabel} role = {'button'}
        id = {mail[0].mail[i].id}
        alignItems="flex-start"
        onClick={handleClickOpen}>
        {cells}
      </ListItem>);
      rows.push(<Divider key = {i + mail[0].mail[i].id} component="li" />);
    }

    const hCSS = {
      color: 'black',
      margin: '0px',
    };

    const lCSS = {
      color: 'black',
    };
    return (
      <div>
        <Box>
          <h4>{mailbox}</h4>
          <h3 style = {hCSS}>{mailbox}</h3>
          <List style = {lCSS}>
            {rows}
          </List>
        </Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{position: 'relative'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close mobile reader"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{ml: 2, flex: 1}}
                variant="h6"
                component="div"
                align='right'>
                <MailOutlineIcon onClick={handleClose}/>
                <VerticalAlignBottomIcon />
                <DeleteIcon onClick={handleClose}/>
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {content}
          </List>
        </Dialog>
        <Dialog
          fullScreen
          open={replyOpen}
          onClose={handleReplyClose}
        >
          <AppBar sx={{position: 'relative'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleReplyClose}
                aria-label="close replier"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography
                sx={{ml: 2, flex: 1}}
                variant="h6"
                component="div"
                align='right'>
                <ArrowForwardIcon onClick = {handleReplyClose}/>
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
              defaultValue="anna@books.com"
            />
            <TextField
              name="subjectCompose"
              type="subjectCompose"
              fullWidth
              label="Subject"
              variant="standard"
              defaultValue="RE: "
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
      </div>
    );
  } else {
    return (
      <Box />
    );
  };
}

/**
 * Creates content of email
 * @param {*} email
 * @param {*} mailbox
 * @param {*} replier
 * @return {*} content
 */
function getContent(email, mailbox, replier) {
  const content = [];
  const contentItems = [];
  const hCSS = {
    color: 'black',
    margin: '0px',
  };
  content.push(<h3 key = {'email' + email.subject}>
    {email.subject}</h3>);

  content.push(<h3 key = {'email' + mailbox} style = {hCSS}>
    {mailbox}</h3>);
  contentItems.push(<ListItemAvatar
    key = {'avatar' + email.from.name[0]}>
    <Avatar key = {'avatar' + email.from.name[0]}>
      {email.from.name[0]}</Avatar>
  </ListItemAvatar>);

  contentItems.push(<ListItemText
    key = {email.id + email.from.name}
    primary={email.from.name + ' ' + email.display}
    secondaryTypographyProps={{color: 'black'}}
    secondary={
      <React.Fragment key = {email.subject}>
        <Typography
          sx={{display: 'inline'}}
          component="span"
          color="black"
        >
          {email.from.email}
        </Typography>
      </React.Fragment>
    }
  />);
  contentItems.push(<ListItemText
    key = {'reply' + email.id}
    align='right'
    primary={
      <IconButton
        aria-label="starDialog"
        role='button'>
        <StarBorderIcon aria-label="starDialog icon"/>
      </IconButton>
    }
    secondary={
      <IconButton
        aria-label="reply"
        role='button'
        onClick = {replier}>
        <ArrowBackIcon aria-label="reply icon"/>
      </IconButton>
    }/>);
  content.push(<ListItem key = {'dialog'}>{contentItems}</ListItem>);
  content.push(<ListItem key = {'dialog' + email.content}>
    <ListItemText>{email.content}</ListItemText></ListItem>);
  return content;
}

export default MailList;
