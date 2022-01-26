/** This class allows to format easily the data containing the timeline returned by the API */
export interface TimelineData {
  toppkfield: number;
  topcnchandlefield: number;
  topstatehandlefield: number;
  topstartdatefield: string;
  topenddatefield: string;
  topdurationfield: number;
}

/** See TimelineData interface. This variant has the fields containing the start and the end of the state modified to contain an EPOCH number instead of a date string */
export interface TimelineDataEpoch {
  toppkfield: number;
  topcnchandlefield: number;
  topstatehandlefield: number;
  topstartdatefield: number;
  topenddatefield: number;
  topdurationfield: number;
}
