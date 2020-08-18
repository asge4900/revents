import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { CloseModal } from './modalReducer';

export default function ModalWrapper({children, size, header}) {
    const dispatch = useDispatch();

    return (
        <Modal open={true} onClose={() => dispatch(CloseModal())} size={size}>
            {header && <Modal.Header>{header}</Modal.Header>}
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}