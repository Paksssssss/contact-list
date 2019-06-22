export class User {
    public id: number;
    public name: string;
    public email: string;
    public contactNo: string;
    
    constructor(id: number, name: string, email: string, contactNo: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contactNo = contactNo;
    }
}