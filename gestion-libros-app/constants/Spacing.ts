/*
  constants/Spacing.ts
  Este archivo define los valores de espaciado (padding, margin) en la aplicación,
  utilizando valores responsivos que se adaptan al tamaño de la pantalla.
*/

import { scale, verticalScale } from 'react-native-size-matters';

export const spacing = {
  negativeSmall: scale(-50),
  xs: scale(1),
  small: scale(8),
  medium: scale(15),
  large: scale(22),
  xl: scale(30),
  xxl: scale(37.5),
  xxxl: scale(70),
  negativelargeHeight: verticalScale(-50),
  negativeSmallHeight: verticalScale(-5),
  XSHeight: verticalScale(10),
  smallHeight: verticalScale(20),
  mediumHeight: verticalScale(27),
  mediumLargeHeight: verticalScale(40),
  largeHeight: verticalScale(50),
  XLHeight: verticalScale(67),
  XXLMinusHeight: verticalScale(100),
  XXLHeight: verticalScale(125),
  XXXLHeight: verticalScale(200),
};