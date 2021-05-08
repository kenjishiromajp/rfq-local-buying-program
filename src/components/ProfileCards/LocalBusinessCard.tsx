import { FC } from 'react';
import { Image, Col, Row, Badge } from 'react-bootstrap';

import { ISupplier } from 'models/ISupplier';

interface IProps {
  supplier: ISupplier;
}
const LocalBusinessCard: FC<IProps> = ({ supplier }) => {
  return (
    <Row style={{ padding: '5px' }}>
      <Col md={3}>
        <Image src={`${supplier.Logo}/180x200`} rounded />
      </Col>
      <Col md={8}>
        <b>{supplier.Name}</b>
        <h5>
          Location: {supplier.City.Name}, {supplier.State.Name}
        </h5>
        <div>
          {supplier.SupplyCategories.map(category => (
            <Badge
              key={category.ID}
              variant="info"
              style={{ marginLeft: '1px' }}
            >
              {' '}
              {category.Name}{' '}
            </Badge>
          ))}
        </div>
        <h5>{supplier.Description}</h5>
      </Col>{' '}
    </Row>
  );
};

export default LocalBusinessCard;
