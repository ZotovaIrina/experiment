export enum DeedDocumentEnum {
    affidavit = 'Affidavit',
    certificate_of_title = 'Certificate of Title',
    quitclaim_deed = 'Quitclaim Deed',
    special_warranty_deed = 'Special Warranty Deed',
    warranty_deed = 'Warranty Deed',
    other = 'Other'
}

type DeedDocumentType = DeedDocumentEnum | null;

export default DeedDocumentType;
