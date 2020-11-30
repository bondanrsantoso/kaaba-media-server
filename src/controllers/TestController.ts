import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  return res.send("This request is successful");
};
