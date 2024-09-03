import localeData from "../localization.js"

const t= (language, path, values={})=>{
    let currentLocaleData= localeData[language];
    const parts = path.split('.');
    let target = currentLocaleData;
    for(const key of parts) {
        if (target[key]) target = target[key];
        else {
            target = null;
            continue;
        }
    }
    
    if (values) {
        for(const key in values) {
            target = target.replace(`{{${key}}}`, values[key]);
        }
    }
    
    return target;
}
const translations = {
    en: {
      "Sai tài khoản": "Incorrect username",
      "Sai mật khẩu": "Incorrect password",
    },
    vi: {
      "Sai tài khoản": "Sai tài khoản",
      "Sai mật khẩu": "Sai mật khẩu",
    },
    // Add other languages here...
  };
export const applyRequestLanguage= (req)=>{
    const contentLanguage=req.contentLanguage;
    return (path, values)=>{
        return t(contentLanguage, path, values);
    }
}
export default t;