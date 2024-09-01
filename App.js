import { Stack } from 'expo-router';
import FontLoader from './components/FontLoader'; // Import the FontLoader component

export default function App() {
  return (
    <FontLoader>
      <Stack />
    </FontLoader>
  );
}