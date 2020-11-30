export const PORT = process.env.PORT || 3000;
export const environment = process.env.NODE_ENV || "development";

export const terminateOnDBDisconnect =
  (process.env.TERMINATE_ON_DB_DISCONNECT || "true") === "true";
