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
      <div className="img position-relative mb-2">
        <img
          src={tender.HeadingImage}
          alt={tender.Title}
          className="radius-sm overflow-hidden"
        />
        <div className="position-absolute p-2 left-0 bottom-0">
          {(tender.SupplyCategories || []).map(supplyCategory => (
            <Badge
              className="mr-2"
              variant="success"
              pill
              key={supplyCategory.ID}
            >
              <h5 className="m-0">{supplyCategory.Name}</h5>
            </Badge>
          ))}
        </div>
      </div>
      <h3>{tender.Title}</h3>
      <Row>
        <Col md={6}>
          <small className="d-flex">Est. Delivery</small>
          <strong>{moment(tender.ClosingAt).format('DD/MM/YYYY')}</strong>
        </Col>
        <Col md={6}>
          <small className="d-flex">Posted By</small>
          <strong>{tender.Buyer?.Name}</strong>
        </Col>
      </Row>
    </div>
  );
};

export default TenderDetailCard;
