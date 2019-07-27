export interface IUserassets {
  id?: number;
  userid?: string;
  balance?: string;
  usablebalance?: string;
  frozenbalance?: string;
  couponsum?: string;
  integral?: string;
  creator?: string;
  createdate?: string;
  modifier?: string;
  modifierdate?: string;
  modifiernum?: number;
  logicdelete?: boolean;
  other?: string;
}

export const defaultValue: Readonly<IUserassets> = {
  logicdelete: false
};
