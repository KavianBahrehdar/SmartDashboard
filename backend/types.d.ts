import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

declare module "express" {
  interface Request {
    userId?: string | JwtPayload;
    weatherApi_ip?: string;
    weatherApi_port?: number;
    weatherApi_url?: string;
    sysInfoApi_url?: string;
    powerDataApi_url?: string;
  }
}