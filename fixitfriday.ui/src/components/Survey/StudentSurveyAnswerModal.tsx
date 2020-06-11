import React, { FC, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalFooter from 'react-bootstrap/ModalFooter';
import { StudentSurveyAnswerProps } from './types/StudentSurveyAnswerProps';

const StudentSurveyAnswerModal: FC<StudentSurveyAnswerProps> = ({
  surveyDefinition,
  studentId,
  studentName,
  studentanswer,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  useEffect(() => {
    const question = surveyDefinition.questions.filter((q) => q.id === studentanswer.id);
    if (question && question.length > 0) {
      setCurrentQuestion(question[0].question);
    }
  }, [currentQuestion, studentanswer.id, surveyDefinition.questions]);

  return (
    <div>
      <div role="presentation" onClick={() => setShowModal(true)} onKeyDown={() => setShowModal(true)}>
        {studentanswer.answer}
      </div>
      <div>
        <Modal ref={React.createRef()} show={showModal} animation={false} centered>
          <ModalHeader>
            <ModalTitle>
              <h1>{currentQuestion}</h1>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row key={studentId}>
              <Col xs={4}>
                <strong>Student name:</strong>
              </Col>
              <Col xs={8}>{studentName}</Col>
            </Row>
            <Row>
              <Col xs={4}>
                <strong>Answer:</strong>
              </Col>
              <Col xs={8}>{studentanswer.answer}</Col>
            </Row>
            <Row>
              <Col xs={12}>
                <strong>Comments:</strong>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Control as="textarea" rows={3} value={studentanswer.comments} onChange={()=>''}/>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Col xs={3} />
              <Col xs={3}>
                <Button variant="danger" onClick={() => setShowModal(false)}>
                  &nbsp;Close&nbsp;
                </Button>
              </Col>
              <Col xs={3}>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  &nbsp;&nbsp;Save&nbsp;&nbsp;
                </Button>
              </Col>
              <Col xs={3} />
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default StudentSurveyAnswerModal;
