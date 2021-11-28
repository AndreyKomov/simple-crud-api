
const addUrl = (base) => {
    const Url = (req, res) => {
    const resultUrl = new URL(req.url, base)
    const urlsArray = resultUrl.pathname.split('/');
    const firstUrlParam = urlsArray[1];
    const secondUrlParam = urlsArray[2];

    if (firstUrlParam === 'person') {
        req.pathname = ['/person'];
        req.personId = secondUrlParam ? secondUrlParam : null
    }
};
return Url;
};

module.exports = addUrl;
