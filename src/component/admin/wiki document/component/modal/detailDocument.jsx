import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
const DetailWikiDocument = ({ data }) => {

    return (
        <div className="w-full min-h-screen bg-white">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <Viewer fileUrl={data.file} plugins={[defaultLayoutPlugin()]} />
            </Worker>
        </div>
    )
}
export default DetailWikiDocument