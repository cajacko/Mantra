import statusBarHeight from 'helpers/statusBarHeight';
import {
  WHITE,
  BLACK,
  GREY_LIGHTER,
  GREY_LIGHT,
  GREY,
} from 'constants/colours';
import { TEXT_SIZES, TEXT_COLOURS } from 'constants/text';

export default {
  modal: {
    position: 'absolute',
    top: statusBarHeight(),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  modalBackground: {
    backgroundColor: GREY_LIGHT,
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalWrapper: {
    backgroundColor: GREY_LIGHTER,
    padding: 20,
    shadowOffset: { width: -2, height: 2 },
    shadowColor: BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    height: 200,
    width: 300,
    justifyContent: 'space-between',
  },

  modalText: {
    fontSize: TEXT_SIZES.MEDIUM,
    textAlign: 'center',
  },

  modalButton: {
    backgroundColor: GREY_LIGHT,
    borderColor: GREY,
    borderWidth: 2,
    alignItems: 'center',
    // paddingLeft: 30,
    // paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    shadowOffset: { width: -2, height: 2 },
    shadowColor: BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  container: {
    flex: 1,
    paddingTop: statusBarHeight(),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    padding: 20,
  },

  description: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: TEXT_SIZES.MEDIUM,
  },

  login: {
    alignItems: 'center',
  },

  loginTitle: {
    fontSize: TEXT_SIZES.MEDIUM,
  },

  input: {
    marginBottom: 35,
    backgroundColor: GREY_LIGHTER,
    borderColor: GREY_LIGHT,
    borderWidth: 2,
    fontSize: TEXT_SIZES.MEDIUM,
    height: 40,
    marginTop: 20,
    width: 200,
    textAlign: 'center',
  },

  placeholderColor: TEXT_COLOURS.GREY,

  register: {
    marginBottom: 50,
    alignItems: 'center',
  },

  activity: {
    position: 'absolute',
    bottom: -35,
  },
};
