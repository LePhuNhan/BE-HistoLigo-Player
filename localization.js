const localeData = {

};
import Language from "./models/language.model.js";

export const initLocaleData = async () => {
    try {
        const languages = await Language.find();
        for (let language of languages) {
            localeData[language.name]=language.content;
        }
        // console.log(localeData);
    } catch (error) {
       
    }
};
export default localeData;