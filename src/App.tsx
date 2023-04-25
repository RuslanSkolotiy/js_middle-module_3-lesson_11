import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Notes, Page404 } from './pages';
import { useState } from 'react';
import { NotesProvider } from './context';
import AuthProvider from './context/AuthProvider';
import { PrivateRoute } from './components';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <NotesProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/notes/'>
                  <Route index element={<PrivateRoute><Notes noWorkspace={true} /></PrivateRoute>} />
                  <Route path=":id" element={<PrivateRoute><Notes /></PrivateRoute>} />
                </Route>
                <Route path='*' element={<Page404 />} />
              </Routes>
            </BrowserRouter>
          </NotesProvider>
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider >

  )
}

export default App
