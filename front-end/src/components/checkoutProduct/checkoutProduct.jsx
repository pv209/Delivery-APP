import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from '../../context/checkoutContext';
import CardProduct from './checkoutProductElements';

export default function CheckoutProduct({ index, id, name, qtd, price,
  option,
  dataTestID1,
  dataTestID2, dataTestID3, dataTestID4, dataTestID5 }) {
  const newPrice = option ? (price / qtd).toFixed(2).toString().replace(/\./g, ',')
    : (price).replace(/\./g, ',');
  const subtotal = option ? (price).toString().replace(/\./g, ',')
    : (parseFloat(price) * qtd).toFixed(2).toString().replace(/\./g, ',');
  const { aux, setAux } = useContext(CheckoutContext);
  const testIdIndex = option
    ? `customer_checkout__element-order-table-item-number-${index}`
    : `customer_order_details__element-order-table-item-number-${index}`;
  const testIdName = option ? `customer_checkout__element-order-table-name-${index}`
    : `customer_order_details__element-order-table-name-${index}`;
  const testIdQtd = option ? `customer_checkout__element-order-table-quantity-${index}`
    : `customer_order_details__element-order-table-quantity-${index}`;
  const testIdUnitPrice = option
    ? `customer_checkout__element-order-table-unit-price-${index}`
    : 'alou';
  const testIdSubTotal = option
    ? `customer_checkout__element-order-table-sub-total-${index}`
    : `customer_order_details__element-order-table-sub-total-${index}`;
  function deleteItem(idx) {
    const sales = aux.filter((item) => {
      console.log(item.product_id);
      console.log(idx);
      return item.product_id !== idx;
    });
    setAux(sales);
  }
  return (
    <div key={ id } border="1px" border-style="groove">
      <CardProduct>
        <p
          className="numberItem"
          data-testid={ dataTestID1 || testIdIndex }
        >
          {index + 1}
        </p>
        <p
          className="nameItem"
          data-testid={ dataTestID2 || testIdName }
        >
          {name}
        </p>
        <p
          className="quantityItem"
          data-testid={ dataTestID3 || testIdQtd }
        >
          {qtd}
        </p>
        <p
          className="priceItem"
          data-testid={ dataTestID4 || testIdUnitPrice }
        >
          {newPrice}
        </p>
        <p
          className="subTotalItem"
          data-testid={ dataTestID5 || testIdSubTotal }
        >
          {`R$:${subtotal}`}
        </p>
        {option && (

          <button
            className="btnRemoveItem"
            type="button"
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            onClick={ () => deleteItem(id) }
          >
            REMOVER
          </button>
        )}
      </CardProduct>
    </div>
  );
}

CheckoutProduct.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  qtd: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  option: PropTypes.bool.isRequired,
  dataTestID1: PropTypes.string.isRequired,
  dataTestID2: PropTypes.string.isRequired,
  dataTestID3: PropTypes.string.isRequired,
  dataTestID4: PropTypes.string.isRequired,
  dataTestID5: PropTypes.string.isRequired,
};
