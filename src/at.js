const text = "   \n  Hello, world!  \n"

// 先頭からスペースと改行を除去する
const cleanedText = text.replace(/^\s+/, "")

console.log(cleanedText)
// 出力: "Hello, world!  \n"
