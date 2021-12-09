export namespace Keys{
    export const expirationTimeJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
    export const secretKeyJWT = 'M4567I23N234567D';
    export const folderPersonalCV = '../../files/personalCV';
    export const folderArkusCV = '../../files/arkusCV';
    export const folderInterviewReport = '../../files/interviewReport';
    export const namePersonalCV = 'file';
    export const nameArkusCV = 'file';
    export const nameInterviewReport = 'file';
    export const extensionFiles:string[] = ['.PDF', '.DOC', '.DOCX'];
    export const maxSizeFile = 20024 * 20024;
}      
