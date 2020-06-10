import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import RadioButton from '../utilities/input/radioButton/RadioButton';
import AdvancedSearchData from './AdvancedSearchData';

const scrollableStyles = {
  maxHeight: '250px',
  overflow: 'auto',
};

const Header = () => (
  <Row>
    <Col xs={12}>
      <h1>Survey Results Finder</h1>
    </Col>
  </Row>
);

const AdvancedSearch: React.FC = () => {
  return (
    <Form>
      <Header />
      <Row style={{ marginTop: '15px' }}>
        <Col sm={12} md={4} style={scrollableStyles}>
          <RadioButton
            inputLabel={AdvancedSearchData.studentSelectionData.inputLabel}
            inputName={AdvancedSearchData.studentSelectionData.inputName}
            options={AdvancedSearchData.studentSelectionData.options}
          />
        </Col>
        <Col sm={12} md={8} style={scrollableStyles}>
          <Row>
            <Col xs={12}>
              <Form.Group controlId="SearchBar">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type student name or class name"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value=""
                />
              </Form.Group>
            </Col>
            {!AdvancedSearchData.surveysList ? (
              <></>
            ) : (
              AdvancedSearchData.surveysList.map(({ inputLabel, inputName, options }) => (
                <Col sm={12} md={6} key={inputName}>
                  <RadioButton inputLabel={inputLabel} inputName={inputName} options={options} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearch;
