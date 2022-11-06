import theme from './src/global/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';


export default function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <Routes />
    </ThemeProvider>
  );
}
