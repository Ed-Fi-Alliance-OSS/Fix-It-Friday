import React, { FC, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Button from 'react-bootstrap/Button';
import { SurveyClassType } from './types/SurveyClassType';
import { SurveyRosterProps } from './types/SurveyRosterProps';

const SurveyRoster: FC<SurveyRosterProps> = ({ surveys }) => {
  const [state, setState] = useState<boolean>(false);
  const [radioChecked, setRadioChecked] = useState<string>('');
  // Set the first element checked
  useEffect(()=> {
    if (radioChecked === '' && surveys && surveys.length > 0) {
      setRadioChecked(surveys[0].surveyKey);
    }
  });

  const surveyOptions =
    surveys && surveys.length > 0 ? (
      surveys.map((s: SurveyClassType) => (
        <div key={s.surveyKey} id={s.surveyKey}>
          <input
            type="radio"
            key={s.surveyKey}
            checked={radioChecked === s.surveyKey}
            value={s.surveyName}
            onChange={() => setRadioChecked(s.surveyKey)}
          />
          &nbsp;{s.surveyName}
        </div>
      ))
    ) : (
      <div />
    );
  // If the section does not have related surveys, the component is not shown
  return surveys && surveys.length > 0 ? (
    <div ref={React.createRef()}>
      <div id="modalSurveyShow" style={{ float: 'right' }}>
        <Button variant="primary" onClick={() => setState(true)}>
          Class Survey Results
        </Button>
      </div>
      <Modal ref={React.createRef()} show={state} animation={false} >
        <ModalHeader>
          <ModalTitle>Class Survey Results</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>{surveyOptions}</Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Col xs={3} />
            <Col xs={3}>
              <Button variant="danger" onClick={() => setState(false)}>
                Close
              </Button>
            </Col>
            <Col xs={3}>
              <Button variant="primary" onClick={() => setState(false)}>
                &nbsp;&nbsp;OK&nbsp;&nbsp;
              </Button>
            </Col>
            <Col xs={3} />
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  ) : (
    <div />
  );
};

export default SurveyRoster;
