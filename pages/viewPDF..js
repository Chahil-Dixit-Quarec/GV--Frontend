import {useRouter} from 'next/router';
import {isMobile} from 'react-device-detect';

function viewPDF(item) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    let pdfFile = router.query.item;
    let renderHTML = '';
    if (isMobile) {
        pdfFile = "https://docs.google.com/viewer?url=" + pdfFile + "&embedded=true";
        renderHTML = <iframe src={pdfFile} frameborder='0' height='500px' width = '100%' > < /iframe>;
    } else {
        renderHTML = <object data={pdfFile} type='application/pdf' width='100%' height='100vh'> +
            <p>If you can&apos;t see the pdf, please <a href={pdfFile}>click here</a> to download to PDF </p></object>
    }
    return (
        <>
            {renderHTML}
        </>
    );
}

export default viewPDF;
