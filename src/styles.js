const styles = (theme) => ({
  // some of this is from beteral ui theme is one of thoeses

  root: {
    backgroundColor: theme.palette.background.paper,
    display: "table",
    display: "table-row",
    height: "100%",
    display: "table-cell",

    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
    bottom: " auto",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  newNoteBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#29487d",
    color: "white",
    "&:hover": {
      backgroundColor: "#88a2ce",
    },
  },
  sidebarContainer: {
    position: "relative",
    display: "block",
    marginTop: "0px",
    borderBottom: "solid",
    // paddingBottom: "20px",
    width: "20%",
    // height: "100%",
    boxSizing: "border-box",
    float: "left",
    border: "solid black 3px",
    overflowX: "hidden",
    display: "block",
  },
  newNoteInput: {
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)",
    },
  },
  newNoteSubmitBtn: {
    width: "100%",
    backgroundColor: "#28787c",
    borderRadius: "0px",
    color: "white",
  },
  chatBody: {
    width: "80%",
    height: "100%",
    float: "right",
    margin: "0px",
    padding: "0px",
  },
  appContainer: {},
});

export default styles;
