import { Modal } from "react-bootstrap";

export default function MyModal(props) {

    console.log("In modall")
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="flex my-5">
                <div className="text-center">{props.msg}</div>
            </Modal.Body>
        </Modal>
    );
}