import { KeyfileData } from "../server";
declare global {
  namespace Express {
    export interface Request {
      keyfileData?: KeyfileData;
    }
  }
}
