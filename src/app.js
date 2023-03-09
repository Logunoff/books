import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/hoc/ProtectedRoute';
import { Layout } from './components/layout/layout';
import { Auth } from './pages/auth/auth';
import { BookPage } from './pages/book';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { MainPage } from './pages/main';
import { Registration } from './pages/registration/registration';
import { Rules } from './pages/rules/rules';
import { Terms } from './pages/terms/terms';

export const App = () => (
    <Routes>
        <Route element={<ProtectedRoute />} >
            <Route path='/' element={<Layout />} >
                <Route index={true} element={<Navigate to='/books/all' />} />
                <Route path='/books/:genre' element={<MainPage />} />
                <Route path='/books/:genre/:id' element={<BookPage />} />
                <Route path='/rules' element={<Rules />} />
                <Route path='/terms' element={<Terms />} />
            </Route>
        </Route>
        <Route path='/auth' element={<Auth />} />
        <Route path='/forgot-pass' element={<ForgotPassword />} />
        <Route path='/registration' element={<Registration />} />
    </Routes >
);