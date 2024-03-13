import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Customer from './pages/Customer/customer.tsx';
import Billing from './pages/Billing/billing.tsx';
import Report from './pages/Report/report.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
		children: [
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
		<RouterProvider router={router} />
	// </React.StrictMode>
);
