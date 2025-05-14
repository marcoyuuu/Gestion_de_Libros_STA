/*
  constants/dimensions.ts
  Este archivo define las dimensiones responsivas de ciertos elementos de la interfaz de usuario,
  permitiendo que la aplicación se vea bien en distintos tamaños de pantalla.
*/

import { scale, verticalScale } from 'react-native-size-matters';

export const dimensions = {
  buttonWidthSmall: scale(100),
  buttonWidthMedium: scale(150),
  buttonWidthLarge: scale(300),
  buttonHeightSmall: verticalScale(40),
  buttonHeight: verticalScale(50),
  buttonHeightLarge: verticalScale(75),
  PersonSvgWidth: scale(300),
  PersonSvgHeight: verticalScale(300),
};
