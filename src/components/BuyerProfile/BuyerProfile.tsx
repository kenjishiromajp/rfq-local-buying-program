import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { IBuyer } from 'models/IBuyer';
import { ITender } from 'models/ITender';

interface IProps {
  buyer: IBuyer;
  tenders: ITender[];
}
const BuyerProfile: FC<IProps> = ({ buyer, tenders }) => {
  return (
    <SectionWithContainer>
      <Row>
        <Col className="offset-md-1" md={3}>
          <Card
            style={{ width: '100%', height: '200px' }}
            className="overflow-hidden"
          >
            <Image priority layout="fill" src={buyer.Logo} alt={buyer.Name} />
          </Card>
          <h2>{buyer.Name}</h2>
          <div className="d-flex">
            <strong>ABN:</strong>
            <span>{buyer.ABN}</span>
          </div>
          <div className="d-flex">
            <strong>FROM:</strong>
            <span>
              {buyer.City?.Name}, {buyer.State?.Name}
            </span>
          </div>
        </Col>
        <Col>
          <section>
            <h3>{buyer.Name}'s Tenders</h3>
            <Row>
              {tenders.map((tender: ITender) => (
                <Col key={tender.ID} md={6} className="mb-3">
                  <Link href={`/tenders/${tender.ID}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-dark text-left radius-0"
                      as="a"
                    >
                      <TenderDetailCard tender={tender} />
                    </Button>
                  </Link>
                </Col>
              ))}
            </Row>
          </section>
        </Col>
      </Row>
    </SectionWithContainer>
  );
};

export default BuyerProfile;
