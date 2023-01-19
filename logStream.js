import readline from "readline";
import { spawn } from "node:child_process";
import { CameraStatus } from "./cameraStatus.js";

const startStreamIndicator = "start stream";
const stopStreamIndicator = "stop stream";
const macOsVenturaPostFix = "ing";

const getStatusStreamIndicator = (input, cameraStatus) => {
  const indicator =
    cameraStatus === CameraStatus.Active
      ? startStreamIndicator
      : stopStreamIndicator;
  const oppositeIndicator =
    cameraStatus === CameraStatus.Active
      ? stopStreamIndicator
      : startStreamIndicator;

  return (
    input.indexOf(indicator) !== -1 &&
    input.indexOf(oppositeIndicator) === -1 &&
    input.indexOf(`${indicator}${macOsVenturaPostFix}`) === -1
  );
};

const getCameraStatus = (input) => {
  switch (true) {
    case getStatusStreamIndicator(input, CameraStatus.Active):
      return CameraStatus.Active;
    case getStatusStreamIndicator(input, CameraStatus.Inactive):
      return CameraStatus.Inative;
  }
};

// log stream --predicate="processImagePath endswith 'UVCAssistant' and (composedMessage contains 'start stream' or composedMessage contains 'stop stream')"
export const cameraStream = spawn("log", [
  "stream",
  "--predicate",
  "processImagePath endswith 'UVCAssistant' and (composedMessage contains 'start stream' or composedMessage contains 'stop stream')",
]);

export const lineReader = readline.createInterface({
  input: cameraStream.stdout,
});

export const subscribeToCameraEvents = (callback) => {
  lineReader.on("line", async (input) => {
    const cameraStatus = getCameraStatus(input);
    if (!cameraStatus) {
      return;
    }

    await callback(cameraStatus);
  });
};
