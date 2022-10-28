import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { Welcome } from './src/pages/welcome';

export default function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <Welcome />
    </ThemeProvider>
  );
}
