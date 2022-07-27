import React from 'react'
import { Modal,Table } from 'react-bootstrap'

export default function HistoryTransactionModal(props) {
  return (
    <div>
        <Modal show={props.show} onHide={()=>{props.close()}}>
        <Modal.Header closeButton>
          <Modal.Title>History Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table>
            <thead>
                <tr>
                    <td>Signature</td>
                    <td>Token ID</td>
                    <td>From</td>
                    <td>To</td>
                    <td>Amount</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </Table>

        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
        </Modal>
    </div>
  )
}
