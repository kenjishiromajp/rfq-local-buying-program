import { FC } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';

// eslint-disable-next-line import/no-unresolved
import { Except } from 'type-fest';

import { ITenderProduct } from 'models/ITenderProduct';

interface IProps {
  value: Except<ITenderProduct, 'ID' | 'Tender' | 'Tender_ID'>[];
  onChange(
    tenderProducts: Except<ITenderProduct, 'ID' | 'Tender' | 'Tender_ID'>[],
  ): any;
}
const MultipleProductFormControl: FC<IProps> = ({ value = [], onChange }) => {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          size="sm"
          onClick={() => {
            onChange([...value, { Name: '', Quantity: 1 }]);
          }}
        >
          Add More Product
        </Button>
      </div>
      {(value || []).map((tenderProduct, index) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Row className="align-items-center">
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name={`TenderProduct[${index}][Name]`}
                  value={tenderProduct.Name}
                  onChange={({ target: { value: valueControl } }) => {
                    onChange([
                      ...value.slice(0, index),
                      { ...value[index], Name: valueControl },
                      ...value.slice(index + 1),
                    ]);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name={`TenderProduct[${index}][Quantity]`}
                  value={tenderProduct.Quantity}
                  onChange={({ target: { value: valueControl } }) => {
                    onChange([
                      ...value.slice(0, index),
                      { ...value[index], Quantity: parseInt(valueControl, 10) },
                      ...value.slice(index + 1),
                    ]);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="auto" className="d-flex align-items-center">
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => {
                  onChange([
                    ...value.slice(0, index),
                    ...value.slice(index + 1),
                  ]);
                }}
              >
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default MultipleProductFormControl;
