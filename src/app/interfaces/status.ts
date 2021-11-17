export interface Status {
  Reference: string,
  Order: string,
  Job: string,
  JobCycleTime: number,
  PartCount: number,
  State: {
  Handle: number,
    Name: string,
    Color: string,
    OEECategory: number,
    ParentHandle: string,
    CloseDay: boolean,
    ProdPercent: boolean,
    UsePercent: boolean
},
  LastTop: string,
  Comment: string,
  Alarms: [],
  ActiveProgram: {}
}
