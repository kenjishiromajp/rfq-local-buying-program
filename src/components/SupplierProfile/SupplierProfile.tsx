import Image from 'next/image';
import { FC } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { ISupplier } from 'models/ISupplier';

interface IProps {
  supplier: ISupplier;
}
const SupplierProfile: FC<IProps> = ({ supplier }) => {
  return (
    <SectionWithContainer>
      <Row>
        <Col className="offset-md-1" md={3}>
          <Card
            style={{ width: '100%', height: '200px' }}
            className="overflow-hidden"
          >
            <Image
              priority
              objectFit="cover"
              layout="fill"
              src={
                supplier.Logo ||
                'https://images.unsplash.com/photo-1608661649625-a3c3c576f9b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
              }
              alt={supplier.Name}
            />
          </Card>
          <h2>{supplier.Name}</h2>
          <div className="d-flex">
            <strong>ABN:</strong>
            <span>{supplier.ABN}</span>
          </div>
          <div className="d-flex">
            <strong>FROM:</strong>
            <span>
              {supplier.City?.Name}, {supplier.State?.Name}
            </span>
          </div>
        </Col>
        <Col>
          <section className="mb-3">
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{ __html: supplier.Description }} />
          </section>
          <section>
            <h3>Supply Categories</h3>
            <Row>
              {supplier.SupplyCategories?.map(supplyCategory => (
                <Col key={supplyCategory.ID} md="auto">
                  <Badge variant="primary">
                    <h4 className="m-0 p-2">{supplyCategory.Name}</h4>
                  </Badge>
                </Col>
              ))}
            </Row>
          </section>
        </Col>
      </Row>
    </SectionWithContainer>
  );
};

export default SupplierProfile;
