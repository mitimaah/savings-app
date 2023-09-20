import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Layout } from 'ui';
import { BudgetPage } from './Budget.page';
import { NoMatchPage } from './NoMatch.page';
import { WalletPage } from './Wallet.page';

const routing = [
  {
    path: '/budget',
    component: BudgetPage,
    linkText: 'Budżet',
    menuOrder: 2,
  },
  {
    path: '/',
    component: WalletPage,
    linkText: 'Portfel',
    menuOrder: 1,
  },
  {
    path: '*',
    component: NoMatchPage,
    linkText: null,
  },
];

const Routing = () => (
  <Router>
    <Layout routing={routing}>
      <Switch>
        {routing.map(({ path, component }) => (
          <Route key={path} path={path} component={component} />
        ))}
      </Switch>
    </Layout>
  </Router>
);
export default Routing;
