import Image from 'next/image';
import { FC, HTMLProps, useMemo } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

import cx from 'classnames';
import moment from 'moment';

import { ITender } from 'models/ITender';

interface IProps extends HTMLProps<HTMLDivElement> {
  tender: ITender;
}
const TenderDetailCard: FC<IProps> = ({ tender, className, ...props }) => {
  const isClosed = useMemo(() => {
    return moment().startOf('day').isAfter(moment(tender.ClosingAt));
  }, []);

  return (
    <div
      className={cx('d-flex flex-column', className, {
        'opacity-50': isClosed,
      })}
      {...props}
    >
      <div className="position-relative mb-2">
        <div
          className="radius-sm overflow-hidden position-relative"
          style={{ height: '100px' }}
        >
          <Image
            priority
            layout="fill"
            src={
              tender.HeadingImage ||
              'https://images.unsplash.com/photo-1608661649625-a3c3c576f9b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
            }
            alt={tender.Title}
            objectFit="cover"
          />
        </div>
        <div className="position-absolute p-2 left-0 bottom-0">
          {(tender.SupplyCategories || []).map(supplyCategory => (
            <Badge
              className="mr-2"
              variant="success"
              pill
              key={supplyCategory.ID}
            >
              <p className="m-0">{supplyCategory.Name}</p>
            </Badge>
          ))}
        </div>
      </div>
      <h3 className="h4">{tender.Title}</h3>
      <Row>
        <Col md={6}>
          <small className="d-flex">Est. Delivery</small>
          <small className="font-weight-bold">
            {moment(tender.ClosingAt).format('DD/MM/YYYY')}
          </small>
        </Col>
        <Col md={6}>
          <small className="d-flex">Posted By</small>
          <small className="font-weight-bold">{tender.Buyer?.Name}</small>
        </Col>
      </Row>
    </div>
  );
};

export default TenderDetailCard;
