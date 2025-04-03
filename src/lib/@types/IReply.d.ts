export default interface IReply {
    success?: boolean;
    data?: any;
    messages?: string[];
    errors?: string[];
    status?: number;
}
