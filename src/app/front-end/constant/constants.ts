import {environment} from "../../../environments/environment";
import {ImageData} from "../interface/image-data";

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

export const LogoLarge: ImageData = {
  width: 146,
  height: 58,
  url: "assets/logo/logo-large.svg"
}

export const LogoShort: ImageData = {
  width: 40,
  height: 40,
  url: "assets/logo/logo-short.webp"
}

export const AppRouter = {
  Empty: '',
  Auth: "auth",
  Main: "main",
  Login: "login",
  Register: "register",
  NotFound: "not-found",
  MangaDetail: "manga",
  ChapterDetail: "chapter",
  Error: "error",
}

export const AppRouterAdmin = {
  Admin: "admin",
  ...AppRouter
}

export const RouteManga = {
  Param: 'idManga'
}

export const RouteChapter = {
  Param: 'idChapter'
}
