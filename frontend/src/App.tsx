import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo-client'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <ApolloProvider client={client}>
      <LandingPage />
    </ApolloProvider>
  )
}

export default App
