import {environment} from "../../../environments/environment";
import {ImageDimension} from "../interface/image-dimension";

export const ErrorDialogDefaultText = {
  title: "Lỗi",
  description: "Lỗi không xác định",
  buttonText: "Thoát"
}

export const TokenPrefix: string = "Bearer "

export const AuthToken: string = "authToken"

export const ApiBaseUrl : string = environment.apiBaseUrl

export const SnackBarConfig = {
  duration: 3 * 1000,
  panelClass: ['snackbar-custom']
}

export const LogoLarge: ImageDimension = {
  width: 146,
  height: 58
}

export const LogoShort: ImageDimension = {
  width: 40,
  height: 40
}
