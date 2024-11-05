const axios = require('axios');

exports.fetchImage = async () => {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
        query: 'food',
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}` }
    });
    return {
        description: response.data.alt_description || "Food image",
        imageUrl: response.data.urls.regular
    };
};
