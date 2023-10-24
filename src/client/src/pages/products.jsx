import { Helmet } from 'react-helmet-async';

import { ProductsView } from '../sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Library | Nexus </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
