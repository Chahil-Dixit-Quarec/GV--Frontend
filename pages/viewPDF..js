import {useRouter} from 'next/router';

function viewPDF(item) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const pdfFile = "https://docs.google.com/gview?embedded=true&url=" + router.query.item;
    console.log(pdfFile);
    return (
        <>
            <object data={pdfFile} type="application/pdf" width="100%"
                    height="100vh">
                <p>Alternative text - include a link <a href={pdfFile}>to the
                    PDF!</a></p>
            </object>
        </>
    );
}

export default viewPDF;
