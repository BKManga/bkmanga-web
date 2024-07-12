import {DialogData} from "./dialog-data";

export interface OutLawReportDialogData extends DialogData {
  usernameReported: string,
  commentReportedId?: number,
  outLawArea: number
}
