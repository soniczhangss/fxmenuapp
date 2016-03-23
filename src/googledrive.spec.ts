import {GoogleDrive} from './googledrive';

describe('root directory tests', () => {
	let a = [""];

	beforeEach(() => a = new GoogleDrive().getFilesInRootDirectory());

	it('ZXL Studio is in the root directory', () => expect(a).toContain("ZXL Studio"));

	it('Others is in the root directory', () => expect(a).toContain("Others"));

	it('IELTS is in the root directory', () => expect(a).toContain("IELTS"));

	it('FIT5167_assi is in the root directory', () => expect(a).toContain("FIT5167_assi"));

	it('FIT5166 is in the root directory', () => expect(a).toContain("FIT5166"));

	it('FIT5045 is in the root directory', () => expect(a).toContain("FIT5045"));

	it('FIT4146 is in the root directory', () => expect(a).toContain("FIT4146"));

	it('Extragreen is in the root directory', () => expect(a).toContain("Extragreen"));

	it('Business Bridging is in the root directory', () => expect(a).toContain("Business Bridging"));

	it('FIT4037 is in the root directory', () => expect(a).toContain("FIT4037"));
});