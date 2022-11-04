export type LayoutRectangle = {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
  width: number;
  height: number;
};

export type LayoutRectangleWithoutPageCoordinates = Omit<
  LayoutRectangle,
  'pageX' | 'pageY'
>;
