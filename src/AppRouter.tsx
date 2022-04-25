import { useRoutes } from 'raviger'

import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
// import EditForm from './pages/EditForm'
import Form from './components/Form'
import PreviewQuiz from './components/PreviewQuiz'
import AppContainer from './components/AppContainer'

const routes = {
    '/': () => <HomePage />,
    '/about': () => <AboutPage />,
    "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewQuiz formId={Number(id)} />
}

export default function AppRouter() {
    let routeResult = useRoutes(routes)
    return (
        <AppContainer>
            {routeResult}
        </AppContainer>
    )
} 