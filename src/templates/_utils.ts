

////

export function decorateJsDoc(content : string[], tabsN = 1) {
	const tabs = '	'.repeat(tabsN);
	if(content.length < 1) return tabs + "/** */";
	return tabs + "/**\n"
		+ content.map(str => `${tabs} * ${str}\n`).join('')
		+ tabs + " */\n";
}

export function buildIndentedText(text : string[], newLineAfter = true, tabsN = 1) {
	return text.map(str => str ? '	'.repeat(tabsN) + str : '')
		.join('\n')
		+ ( newLineAfter ? '\n' : '' );
}


// function decorateJsDoc(content : string) {
// 	const arr = content.split('\n');
// 	return "	/**\n" + arr.map(str => `	 * ${str}`).join('\n') + "\n	 */\n";
// }