export interface Product {
	iProductId: number | string,
	iCategoryId: string | string,
	vName: string,
	vDescription: string,
	vImage: string,
	eSize: string,
	tSizeArray: string,
	// tSizeArray: Array<[{
	// 	iPrice: number | string,
	// 	vName: string,
	// }]>,
	eType: string,
	tTypeArray: string,
	dInsertedDate: string,
	eStatus: string,
	iOrderNo: number | string,
	iPrice: number | string,
	Product_type: number | string
}