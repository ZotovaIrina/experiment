export class USState {
    public static AL = new USState('AL', '01', 'Alabama');
    public static AK = new USState('AK', '02', 'Alaska');
    public static AZ = new USState('AZ', '04', 'Arizona');
    public static AR = new USState('AR', '05', 'Arkansas');
    public static CA = new USState('CA', '06', 'California');
    public static CO = new USState('CO', '08', 'Colorado');
    public static CT = new USState('CT', '09', 'Connecticut');
    public static DE = new USState('DE', '10', 'Delaware');
    public static DC = new USState('DC', '11', 'District of Columbia');
    public static FL = new USState('FL', '12', 'Florida');
    public static GA = new USState('GA', '13', 'Georgia');
    public static HI = new USState('HI', '15', 'Hawaii');
    public static ID = new USState('ID', '16', 'Idaho');
    public static IL = new USState('IL', '17', 'Illinois');
    public static IN = new USState('IN', '18', 'Indiana');
    public static IA = new USState('IA', '19', 'Iowa');
    public static KS = new USState('KS', '20', 'Kansas');
    public static KY = new USState('KY', '21', 'Kentucky');
    public static LA = new USState('LA', '22', 'Louisiana');
    public static ME = new USState('ME', '23', 'Maine');
    public static MD = new USState('MD', '24', 'Maryland');
    public static MA = new USState('MA', '25', 'Massachusetts');
    public static MI = new USState('MI', '26', 'Michigan');
    public static MN = new USState('MN', '27', 'Minnesota');
    public static MS = new USState('MS', '28', 'Mississippi');
    public static MO = new USState('MO', '29', 'Missouri');
    public static MT = new USState('MT', '30', 'Montana');
    public static NE = new USState('NE', '31', 'Nebraska');
    public static NV = new USState('NV', '32', 'Nevada');
    public static NH = new USState('NH', '33', 'New Hampshire');
    public static NJ = new USState('NJ', '34', 'New Jersey');
    public static NM = new USState('NM', '35', 'New Mexico');
    public static NY = new USState('NY', '36', 'New York');
    public static NC = new USState('NC', '37', 'North Carolina');
    public static ND = new USState('ND', '38', 'North Dakota');
    public static OH = new USState('OH', '39', 'Ohio');
    public static OK = new USState('OK', '40', 'Oklahoma');
    public static OR = new USState('OR', '41', 'Oregon');
    public static PA = new USState('PA', '42', 'Pennsylvania');
    public static RI = new USState('RI', '44', 'Rhode Island');
    public static SC = new USState('SC', '45', 'South Carolina');
    public static SD = new USState('SD', '46', 'South Dakota');
    public static TN = new USState('TN', '47', 'Tennessee');
    public static TX = new USState('TX', '48', 'Texas');
    public static UT = new USState('UT', '49', 'Utah');
    public static VT = new USState('VT', '50', 'Vermont');
    public static VA = new USState('VA', '51', 'Virginia');
    public static WA = new USState('WA', '53', 'Washington');
    public static WV = new USState('WV', '54', 'West Virginia');
    public static WI = new USState('WI', '55', 'Wisconsin');
    public static WY = new USState('WY', '56', 'Wyoming');
    public static AS = new USState('AS', '60', 'American Samoa');
    public static GU = new USState('GU', '66', 'Guam');
    public static MP = new USState('MP', '69', 'Northern Mariana Islands');
    public static PR = new USState('PR', '72', 'Puerto Rico');
    public static UM = new USState('UM', '74', 'U.S. Minor Outlying Islands');
    public static VI = new USState('VI', '78', 'Virgin Islands of the U.S.');

    // private to disallow creating other instances of this type
    private constructor(private name: string, private flip: string, private fullName: string) {
    }

    public toString() {
        return this.name;
    }

}
