// ** Router Import
import Router from './router/Router';
// import './styles/theme.scss';
// import 'sanitize.css/sanitize.css';
// import GlobalStyle from './global-styles';
import './App.css';
import { IntlProvider } from 'react-intl';

import GlobalErrorBoundaries from './container/ErrorBoundaries/GlobalErrorBoundary';

import { CookiesProvider } from 'react-cookie';

const App = () => {
	return (
		<>
			<CookiesProvider>
				<IntlProvider>
					<GlobalErrorBoundaries>
						<Router />
					</GlobalErrorBoundaries>
				</IntlProvider>
			</CookiesProvider>
		</>
	);
};

export default App;
