import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Content, Header, HeaderMenuItem, HeaderName, HeaderNavigation} from 'carbon-components-react';
import {OidcProvider, withOidcSecure} from '@axa-fr/react-oidc';
import {DocumentationPage, Edit, SecureEdit} from './pages';

import './app.scss';

// This configuration use the ServiceWorker mode only
// "access_token" will be provided automatically to the urls and domains configured inside "OidcTrustedDomains.js"
const configuration = {
    client_id: 'interactive.public.short',
    redirect_uri: 'http://localhost:3000/csm-use-case-repository/csm-usecase-ui/authentication/callback',
    silent_redirect_uri: 'http://localhost:3000/csm-use-case-repository/csm-usecase-ui/authentication/silent-callback',
    scope: 'openid',
    authority: 'https://demo.duendesoftware.com',
    authority_configuration: {
        authorization_endpoint: "https://demo.duendesoftware.com/connect/authorize",
        end_session_endpoint: "https://demo.duendesoftware.com/connect/endsession",
        revocation_endpoint: "https://demo.duendesoftware.com/connect/revocation",
        token_endpoint: "https://demo.duendesoftware.com/connect/token",
        userinfo_endpoint: "https://demo.duendesoftware.com/connect/userinfo",
    },
    service_worker_relative_url:'/csm-use-case-repository/csm-usecase-ui/OidcServiceWorker.js',
    service_worker_only: false,
};

const configurationName = 'w3id';

class App extends React.Component<any, any> {

  render() {
    return (
      <div className="App">
          <OidcProvider configuration={configuration} configurationName={configurationName}>
              <Header aria-label="Exchange">
                <HeaderName href="#" prefix="">
                  Exchange
                </HeaderName>
                <HeaderNavigation aria-label="Exchange">
                  <HeaderMenuItem href="/">Documentation</HeaderMenuItem>
                  <HeaderMenuItem href="#/docs">Same Documentation on Path</HeaderMenuItem>
                  <HeaderMenuItem href="#/edit-use-case">Edit Use Case</HeaderMenuItem>
                </HeaderNavigation>
              </Header>
              <Content>
                <HashRouter>
                  <Routes>
                    <Route path="/" element={<DocumentationPage />} />
                    <Route path="/docs" element={<DocumentationPage />} />
                    <Route path="/edit-use-case" element={<SecureEdit />} />
                    <Route path="/edit-secure" element={withOidcSecure(Edit)} />
                  </Routes>
                </HashRouter>
              </Content>
          </OidcProvider>
      </div>
    )
  }
}

export default App;
