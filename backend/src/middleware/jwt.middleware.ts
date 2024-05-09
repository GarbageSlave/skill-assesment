import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'

export default (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err: any, decoded: any) {
    if (err) {
      return res.status(401).send("Invalid user token")
    }

    req.user_id = decoded.id

    next()
  })
}