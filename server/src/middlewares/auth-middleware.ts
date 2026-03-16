import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authRequired(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userid: string;
            email: string;
            role: "admin" | "user";
        };

        (req as any).user = decoded;

        next();
    } catch (err: any) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
