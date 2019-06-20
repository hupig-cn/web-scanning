export interface ILinkuser {
  id?: number;
  userid?: string;
  phone?: string;
  name?: string;
  idcard?: string;
  sex?: string;
  address?: string;
  province?: string;
  city?: string;
  county?: string;
  loginnum?: number;
  creator?: string;
  createdate?: string;
  modifier?: string;
  modifierdate?: string;
  modifiernum?: number;
  logicdelete?: boolean;
  other?: string;
}

export const defaultValue: Readonly<ILinkuser> = {
  logicdelete: false
};
