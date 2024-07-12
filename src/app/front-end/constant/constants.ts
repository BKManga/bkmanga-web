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
  Filter: "filter",
  Search: "search",
  Follow: "follow",
  History: "history",
  Genre: "genre",
  Author: "author",
  PrivacyPolicy: "privacy-policy",
  Profile: "profile",
}

export const AppRouterAdmin = {
  Admin: "admin",
  Manga: "manga",
  ErrorReport: "error-report",
  OutLawReport: "outlaw-report",
  User: "user",
  Detail: "detail",
  Add: "add",
  ...AppRouter
}

export const RouteSearch = {
  Param: "search"
}

export const RouteManga = {
  Param: 'idManga'
}

export const RouteAuthor = {
  Param: 'idAuthor'
}

export const RouteChapter = {
  Param: 'idChapter'
}

export const RouteUser = {
  Param: 'idUser'
}

export const RouteGenre = {
  Param: 'idGenre'
}

export const RoutePrivacyPolicy = {
  Param: 'idPrivacyPolicy'
}

export const RouteErrorReport = {
  Param: 'idErrorReport'
}

export const RouteOutLawReport = {
  Param: 'idOutLawReport'
}

export const Role = {
  User: "USER",
  Moderator: "MODERATOR",
  Admin: "ADMIN"
}

export const FilterSearchCheckBox = {
  Choose: "Choose",
  Except: "Except",
  Blank: "Blank"
}

export const CommentBlockArea = {
  MANGA: "manga",
  CHAPTER: "chapter"
}

export const DataOrderBy = {
  ASC: "ASC",
  DESC: "DESC"
}

export const MangaStatus = {
  DONE: 1,
  IN_PROCESS: 2,
  DROPPED: 3
}

export const Gender = {
  MALE: [1, "male"],
  FEMALE: [2, "female"],
  OTHER: [3, "other"],
}

export const ProfilePage = {
  INFO: "info",
  CHANGE_PASSWORD: "changePassword",
}

export const MiddlePrefixHandleImage = {
  Prefix: "/api/v1/file/"
}

export const TargetImage = {
  IMAGE_LARGE: "image_large",
  IMAGE_LOGO: "image_logo"
}

export const GetImage = {
  MANGA_IMAGE_LOGO: `manga/${TargetImage.IMAGE_LOGO}/`,
  MANGA_IMAGE_LARGE: `manga/${TargetImage.IMAGE_LARGE}/`,
  USER_PROFILE_LOGO: "user/profile/"
}

export const AgeRange = {
  AllAge: [1, "All Age"],
  Upper12: [2, "12+"],
  Upper16: [3, "16+"],
  Upper18: [4, "18+"],
}

export const ErrorType = {
  TRANSLATION: [1, "translation"],
  IMAGE_QUANTITY: [2, "image quality"],
  DUPLICATE: [3, "duplicate"],
  LOAD_IMAGE: [4, "load image"],
}

export const OutLawType = {
  HATRED: [1, "hatred"],
  SEXUAL: [2, "sexual"],
  VIOLENCE: [3, "violence"],
  OTHER: [4, "other"]
}

export const OutLawArea = {
  ACCOUNT: 1,
  MANGA_COMMENT: 2,
  CHAPTER_COMMENT: 3
}

export const ProcessStatusHandle = {
  NEW: 1,
  IN_PROCESS: 2,
  RESOLVED: 3,
  REJECTED: 4
}
