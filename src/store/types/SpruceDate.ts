import {DateTime} from 'luxon';

// export default class stringDate {
//
//     //value in ISO format
//     private value: string | null;
//
//     private options = {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'};
//     private formFormat = "MM/dd/yyyy";
//
//     get valueISO() {
//         return this.value
//     }
//
//     get getLocalDateString() {
//         if(this.value !== null) {
//             return DateTime.fromISO(this.value).toLocaleString(this.options)
//         } else {
//             return null
//         }
//
//     }
//
//     get getDateFormString() {
//         if(this.value !== null) {
//             return DateTime.fromISO(this.value).toFormat(this.formFormat)
//         } else {
//             return null
//         }
//     }
//
//     set setValueISO(newValue: string | null) {
//         this.value = newValue
//     }
//
// }
