const {Request} = 'express';
const stopwords = require('stopword')

module.exports = {
    /**
     * @param {Request} req
     * */
    analyze: (req) =>
        new Promise(async (resolve, reject) => {
            let {files} = req.body;

            if (!files) reject({
                "code": 400,
                "message": "Bad request format: 'files' not indicated"
            })

            let result = {};

            try {
                const content = JSON.parse(files)['content']
                let clearedContent = await content.replace(/(\r\n|\n|\r|['" `\-\\=:;,()\[\]*\/?!^&+{}]|[0-9])/gm, " ").trim().toLowerCase();
		let muchMoreClearedContent = await stopwords.removeStopwords(clearedContent.split(' '));

                await muchMoreClearedContent.map(word => {
                    const theWord = word.trim();
                    if (result[theWord]) result[theWord] += 1;
                    else result[theWord] = 1;
                })
            } catch (e) {
                reject({"code": 500, "message": e});
            }

            resolve(result);
        })
}
