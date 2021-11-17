export interface State {
  Handle: number;
  Name: string;
  Color: string;
  OEECategory: number;
  ParentHandle?: any;
  CloseDay: boolean;
  ProdPercent: boolean;
  UsePercent: boolean;
}

export interface ActiveProgram {
}

export interface Status {
  Reference: string;
  Order: string;
  Job: string;
  JobCycleTime: number;
  PartCount: number;
  State: State;
  LastTop: Date;
  Comment: string;
  Alarms: any[];
  ActiveProgram: ActiveProgram;
}

