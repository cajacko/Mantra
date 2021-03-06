import { TEXT_SIZES, TEXT_COLOURS } from 'constants/text';
import { HORIZONTAL_VIEW_SPACING } from 'constants/spacing';
import { GREY_LIGHTER, GREY_LIGHT } from 'constants/colours';

const verticalSpacing = 10;
const horizontalSpacing = HORIZONTAL_VIEW_SPACING;
const placeholderColor = TEXT_COLOURS.GREY;

export default {
  container: {
    paddingLeft: horizontalSpacing,
    backgroundColor: GREY_LIGHTER,
    borderColor: GREY_LIGHT,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    maxWidth: 40,
  },

  input: {
    fontSize: TEXT_SIZES.SMALL,
    paddingTop: verticalSpacing,
    paddingBottom: verticalSpacing,
    flex: 1,
  },

  placeholderColor,

  searchIconSize: 24,
  closeIconSize: 30,
  iconColour: placeholderColor,
};
