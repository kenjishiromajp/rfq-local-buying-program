import { FC } from 'react';
import { Col, Row, RowProps } from 'react-bootstrap';

import { ISupplier } from 'models/ISupplier';

interface IProps extends RowProps {
  supplier: ISupplier;
}
const SupplierDetailCard: FC<IProps> = ({ supplier, ...props }) => {
  return (
    <Row {...props}>
      <Col md={4}>
        <img src={supplier.Logo} alt={supplier.Name} />
      </Col>
      <Col md={8}>
        <h3>{supplier.Name}</h3>
        <small>SERVICES OFFERED</small>
        <ul>
          {(supplier.SupplyCategories || []).map(supplyCategory => (
            <li key={supplyCategory.ID}>{supplyCategory.Name}</li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default SupplierDetailCard;
