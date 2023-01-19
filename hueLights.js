import { CameraStatus } from './cameraStatus.js';

const hueUser = 'bULYbiTRoSLyV6MePp1v4M4rN-VO4fWH6RynClXj';
const lightId = '1';

export const notifyLight = async (cameraStatus) => {
    try {
      const body = {
        on: cameraStatus === CameraStatus.Active,
      };
  
      const response = await fetch(
        `http://10.0.0.158/api/${hueUser}/lights/${lightId}/state`,
        {
          method: "PUT",
          body: JSON.stringify(body),
        }
      );
    } catch (error) {
      console.log(error.response.body);
    }
  };