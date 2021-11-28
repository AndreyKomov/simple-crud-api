const addUrl = (base) => (req, res) => {
    const resultUrl = new URL(req.url, base)
    const urlsArray = resultUrl.pathname.split('/');
    const firstUrlParam = urlsArray[1];
    const secondUrlParam = urlsArray[2];

    if (firstUrlParam === 'person') {
        req.pathname = ['/person'];
        req.personId = secondUrlParam ? secondUrlParam : null
    }
};

module.exports = addUrl;
