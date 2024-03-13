export default class CustomerModel {
	id: number;
	dharaNo: string;
	name: string;
	phone?: string;
	dob?: string;

	// get age() {
	// 	if (this.dob) {
	// 		console.log(this.dob)
	// 		const dobDate = new Date(this.dob);
	// 		const now = new Date();

	// 		let age = now.getFullYear() - dobDate.getFullYear();
	// 		const monthDiff = now.getMonth() - dobDate.getMonth();

	// 		if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dobDate.getDate())) {
	// 			age--;
	// 		}

	// 		return age;
	// 	}
	// 	return '';
	// }
}
