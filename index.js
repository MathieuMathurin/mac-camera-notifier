import { cameraStream, subscribeToCameraEvents } from "./logStream.js";
import { notifyLight } from './hueLights.js';

subscribeToCameraEvents(notifyLight);

process.on("close", (code) => {
  cameraStream.kill(code);
});
