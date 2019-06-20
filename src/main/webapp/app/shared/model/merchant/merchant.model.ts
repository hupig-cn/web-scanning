export interface IMerchant {
  id?: number;
  userid?: string;
  merchantphoto?: string;
  name?: string;
  businessid?: string;
  state?: string;
  address?: string;
  province?: string;
  city?: string;
  county?: string;
  concession?: number;
  rebate?: number;
  weight?: string;
  creator?: string;
  createdate?: string;
  modifier?: string;
  modifierdate?: string;
  modifiernum?: number;
  logicdelete?: boolean;
  other?: string;
}

export const defaultValue: Readonly<IMerchant> = {
  logicdelete: false
};
