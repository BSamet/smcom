export interface Cnc {
  Handle: number,
  Name: string,
  Description: string,
  Disabled: boolean,
  DNCMode: boolean,
  MDCMode: boolean,
  Workshop: string,
  DNCgroup: string,
  MDCGroups: any[],
  DisableParentState: boolean
}
