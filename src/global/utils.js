import { Platform } from 'react-native';

const getPlaceholder = size => `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios, android) =>
  Platform.select({ ios, android });

export default {
  getPlaceholder,
  platformSelect,
};
