const styles = (theme) => ({
  mainContainer: {
    color: "red",

    //     display: "grid",
    //     gridTemplateColumns: "1fr 1.2fr 1.5fr",
    //     gridTemplateRows: "1fr 4fr 3fr 2fr",
    //     gridTemplateAreas:
    //       '"main   main    header"\n    "main   main    candy"\n    "nom    yum     candy"\n    "footer footer  candy"',
  },
  tableContainer: { margin: "30px" },
  BottomContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "2fr 2fr 2fr 2fr",
  },
});

export default styles;
