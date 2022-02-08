//#75f1e0
//#84f8c8
//#a3fbaa
//#cbfc8b
//#f9f871
const barStyle = {
  itemContainer: {
    height: 75,
    backgroundColor: '#7CE8',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    padding: 5,
    left: 12,
  },
  gap: {
    height: 1,
    backgroundColor: '#00308F',
  },
};

export const barStyles = {
  false: {
    //if darkMode false
    barStyle: {...barStyle},
  },
  true: {
    //if darkMode true
    barStyle: {
      ...barStyle,
      itemContainer: {
        ...barStyle.itemContainer,
        backgroundColor: '#a13862',
      },
    },
  },
};

//all colors in all files should be here
export const allColors = {
  false: {
    headerColor: '#a3fbaa',
    mainBackgroundColor: 'rgba(109,106,193,1)',
    //format for the colors: filename > obj-name > propertyName
    settingBarSwitch: {
      settingBar: {
        backgroundColor: '#75f1e0',
      },
    },
    openPdf: {},
    mainScreenList: {},
  },
  true: {
    headerColor: '#af8875',
    mainBackgroundColor: 'rgba(19,16,193,1)',
    //format for the colors: filename > obj-name > propertyName
    settingBarSwitch: {
      settingBar: {
        backgroundColor: '#d09374',
      },
    },
    openPdf: {},
    mainScreenList: {},
  },
};
