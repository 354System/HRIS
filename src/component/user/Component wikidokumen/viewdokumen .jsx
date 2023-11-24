import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const ViewDokumen = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);

    const fileType = ['application/pdf'];

    const handlePdfChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (fileType.includes(file.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setPdfFile(reader.result);
                };
            } else {
                setPdfFile(null);
                console.log("Silakan pilih file PDF yang valid dan coba lagi.");
            }
        } else {
            console.log("Silakan pilih file PDF yang valid dan coba lagi.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        } else {
            setViewPdf(null);
        }
    };

    return (
        <div className="flex">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handlePdfChange} />
                <button className="bg-green-400/40 cursor-pointer" type="submit">Tampilkan PDF</button>
            </form>
            <div className="mt-40">
                <h2 className="font-semibold">Tampilkan PDF</h2>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewPdf && <Viewer fileUrl={viewPdf} />}
                    {!viewPdf && <h1>Tidak ada file yang dipilih</h1>}
                </Worker>
            </div>
        </div>
    );
};

export default ViewDokumen;
