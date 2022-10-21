import {
	toJson,
	toString,
	isEmpty,
	isNotEmpty,
	cleanData,
	isEmptyObject,
	isStringExist,
	checkObjectInList,
	replaceHtml,
	generateRandomString,
	encode,
	decode,
} from 'jnpl-helper';

export class Helper {
	env: string = process.env.NODE_ENV || 'local';

	constructor(private config) {}

	toJson(jsonData: any = ''): any {
		return toJson(jsonData);
	}

	toString(jsonData: any = ''): any {
		return toString(jsonData);
	}

	cleanData(data: any = ''): any {
		return cleanData(data);
	}

	isEmptyObject(obj: Object = {}): boolean {
		return isEmptyObject(obj);
	}

	stringExist(string: string = '', character: string = ''): boolean {
		return isStringExist(string, character);
	}

	isNotEmpty(v: any = null): boolean {
		return isNotEmpty(v);
	}

	isEmpty(v: any = null): boolean {
		return isEmpty(v);
	}

	validateData(obj: Object = {}, list: Array<any> = []): boolean {
		return checkObjectInList(obj, list);
	}

	replaceHtml(html: string = '', data: Object = {}): string {
		return replaceHtml(html, data);
	}

	generateRandomString(num: number = 10): string {
		return generateRandomString(num);
	}

	get passwordExpiry(): Date {
		const dateExpiry = new Date();
		dateExpiry.setDate(dateExpiry.getDate() + this.config.passwordExpiryLength || 30);

		return dateExpiry;
	}

	get secretKey(): string {
		return this.config.secretKey || '';
	}

	get secretHash(): string {
		return this.config.secretKeyHash || '';
	}

	hashEncode(data): any {
		return encode(this.config.secretKeyHash, this.toString(data));
	}

	hashDecode(data: any): any {
		return decode(this.config.secretKeyHash, this.toString(data));
	}
}
