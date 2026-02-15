exports.getCampaigns = async (req, res) => {
    try {
        const { channel, min_roas, max_roas } = req.query;

        try {
            let query = 'SELECT * FROM campaigns WHERE 1=1';
            let params = [];

            if (channel) {
                query += ' AND channel_name = ?';
                params.push(channel);
            }
            if (min_roas) {
                query += ' AND roas >= ?';
                params.push(min_roas);
            }
            if (max_roas) {
                query += ' AND roas <= ?';
                params.push(max_roas);
            }

            query += ' ORDER BY roas DESC';

            const [rows] = await pool.query(query, params);
            if (!rows.length && !channel && !min_roas) throw new Error("No campaign rows");
            return res.json(rows);
        } catch (dbErr) {
            console.warn("DB Connection failed, using JSON fallback for Campaigns.", dbErr.message);
            const cache = getCachedData();
            if (cache && cache.campaigns) {
                let mapped = cache.campaigns.map(c => ({
                    campaign_name: c.campaign,
                    channel_name: c.channel,
                    total_spend: c.spend,
                    total_revenue: c.revenue,
                    conversions: c.conversions,
                    roas: c.roas
                }));
                if (channel) mapped = mapped.filter(c => c.channel_name === channel);
                if (min_roas) mapped = mapped.filter(c => c.roas >= parseFloat(min_roas));
                if (max_roas) mapped = mapped.filter(c => c.roas <= parseFloat(max_roas));
                mapped.sort((a, b) => b.roas - a.roas);

                return res.json(mapped);
            }
            throw dbErr;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};