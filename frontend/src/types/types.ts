export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
};

export type User = {
    id : number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    roles : Role[];
    clientAppointmentsId : number[] | null;
    barberAppointmentsId : number[] | null;
}

export type Role = {
    id: number;
    authority : string;
}

export type Appointment = {
    id: number;
    dateTime: Date;
    barber : User;
    client : User;
}

export type FilterData = {
    dates : Date[];
}
