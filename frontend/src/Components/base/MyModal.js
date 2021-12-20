import { Modal } from "react-bootstrap";

export default function MyModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="flex my-5">
            <h4>{props.msg}</h4>
            </Modal.Body>
        </Modal>
    );
}