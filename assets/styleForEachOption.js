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
    // padding: 5,
    left: 12,
  },
  gap: {
    height: 1,
    backgroundColor: '#00308F',
  },
};

export const allColors = {
  false: {
    //if darkMode false
    barStyle: {...barStyle},
    headerColor: '#a3fbaa',
    colors: {},
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
    headerColor: '#af8875',
    colors: {},
  },
};
