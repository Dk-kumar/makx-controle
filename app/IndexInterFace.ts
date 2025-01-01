export interface UserInfo {
    userid?: string;
    motorid?: string;
  }
  
  export interface UserData {
    username: string;
    phonenumber: string;
    devices:Array<any>;
  }
  
  export interface ToggleOptionParams {
    option1: string;
    option2: string;
    currentValue: string;
  }
  
  export type NotificationMessageObject = {
    message: string;
    time: string;
    id: string;
  }
  
export interface MotorData {
  phase?: string;
  l1?: string;
  l2?: string;
  l3?: string;
  a1?: string;
  a2?: string;
  notification: Array<NotificationMessageObject>;
  unReadMessageCount: number;
  phasearms: ToggleOptionParams;
  phaseenabled: ToggleOptionParams;
  cyclictimer: ToggleOptionParams;
  runtimer: ToggleOptionParams;
  dryrunrestarttimer: ToggleOptionParams;
  "amps&volts": {
    "Dry Run": {
      "Trip Time": number;
      "3P LA": { value: string; unit: string };
      "1P LA": { value: string; unit: string };
      toggle?: boolean;
    };
    Overload: {
      "Trip Time": number;
      "3P HA": { value: string; unit: string };
      "1P HA": { value: string; unit: string };
      toggle?: boolean;
    };
    "Low Volt": {
      "Trip Time": number;
      "3P LV": { value: string; unit: string };
      "1P LV": { value: string; unit: string };
      toggle?: boolean;
    };
    "High Volt": {
      "Trip Time": number;
      "3P HV": { value: string; unit: string };
      "1P HV": { value: string; unit: string };
      toggle?: boolean;
    };
    SPP: {
      "Trip Time": number;
      "SPP Volt": { value: string; unit: string };
      toggle?: boolean;
    };
  };
}

export const resetMotorData: MotorData = {
  phase: '',
  l1: '',
  l2: '',
  l3: '',
  a1: '',
  a2: '',
  notification: [],
  unReadMessageCount: 0,
  phasearms: { option1: '', option2: '', currentValue: '' },
  phaseenabled: { option1: '', option2: '', currentValue: '' },
  cyclictimer: { option1: '', option2: '', currentValue: '' },
  runtimer: { option1: '', option2: '', currentValue: '' },
  dryrunrestarttimer: { option1: '', option2: '', currentValue: '' },
  "amps&volts": {
    "Dry Run": {
      "Trip Time": 0,
      "3P LA": { value: "0", unit: "A" },
      "1P LA": { value: "0", unit: "A"},
      toggle: false,
    },
    Overload: {
      "Trip Time": 0,
      "3P HA": { value: "0", unit: "A" },
      "1P HA": { value: "0", unit: "A" },
      toggle: false,
    },
    "Low Volt": {
      "Trip Time": 0,
      "3P LV": { value: "0", unit: "V" },
      "1P LV": { value: "0", unit: "V" },
      toggle: false,
    },
    "High Volt": {
      "Trip Time": 0,
      "3P HV": { value: "0", unit: "V" },
      "1P HV": { value: "0", unit: "V" },
      toggle: false,
    },
    SPP: {
      "Trip Time": 0,
      "SPP Volt": { value: "0", unit: "V" },
      toggle: false,
    }
  }
};