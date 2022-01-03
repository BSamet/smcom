export interface Times {
  AT: number;
  OT: number;
  PPT: number;
  RT: number;
  NRT: number;
  FPT: number;
  FT: number;
  MTBF: number;
  MTTR: number;
}

export interface Rates {
  TEEP: number;
  GEE: number;
  OEE: number;
  Performance: number;
  Quality: number;
  Availability: number;
  Requisition: number;
  Load: number;
  Involvement: number;
  HardwareAvailability: number;
}

export interface KPI {
  Times: Times;
  Rates: Rates;
}
