declare module "express-session" {
    interface Session {
      visitCount: number;
    }
}