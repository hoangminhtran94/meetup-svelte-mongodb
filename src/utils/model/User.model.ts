import type { Meetup } from './Meetup.model';
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	profileImage: string;
	address: string;
	phone: string;
	meetups?: Meetup[];
}
