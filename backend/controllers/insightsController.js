exports.getInsights = async (req, res) => {
    try {
        const cache = getCachedData();
        if (cache && cache.insights) {
            return res.json(cache.insights);
        } else {
            return res.json(["No insights generated. Please run the python script."]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};