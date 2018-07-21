enum DeedDocumentEnum {
    'Affidavit',
    'Certificate of Title',
    'Quitclaim Deed',
    'Special Warranty Deed',
    'Warranty Deed',
    'Other'
}

type DeedDocumentType = DeedDocumentEnum | null;

export default DeedDocumentType;
