import { URL } from "url";

const {
  MONGODB_URI,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
} = process.env;

export let mongodbURI: string;

if (MONGODB_URI) {
  mongodbURI = MONGODB_URI;
} else {
  const mongodbAuth = MONGODB_USERNAME
    ? (MONGODB_PASSWORD
        ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}`
        : MONGODB_USERNAME) + "@"
    : "";
  mongodbURI = new URL(
    MONGODB_DATABASE || "media-center",
    `mongodb://${mongodbAuth}${MONGODB_HOST || "localhost"}:${
      MONGODB_PORT || 27017
    }`
  ).href;
}
