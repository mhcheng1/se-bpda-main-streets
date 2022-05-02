import papaparse from "papaparse";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import spendingService from "../services/spendingService";

const UploadPage = () => {

    // states
    const [file, setFile] = useState(null)
    const [jsonFile, setJsonFile] = useState(null)

    const convert = () => {
        papaparse.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (_, index) => {
                const header = (index === 0) ? 'date' : 'data'
                return header
            },
            complete: (result) => {
                const data = result.data.map((item) => (
                    {date: item.date, data: parseFloat(item.data)}
                ))
                setJsonFile(data)
            }
        })
    }

    const handleUpload = async () => {
        await spendingService.updateSpending('Allston-Village', jsonFile)
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Upload file</Form.Label>
                <Form.Control type="file" onChange={({target}) => setFile(target.files[0])} />
            </Form.Group>
            {file && (
                <Button variant="primary" onClick={() => convert()}>Convert</Button>
            )}
            {jsonFile && (
                <Button variant="secondary" onClick={() => handleUpload()}>Upload</Button>
            )}
        </div>
    )
}

export default UploadPage